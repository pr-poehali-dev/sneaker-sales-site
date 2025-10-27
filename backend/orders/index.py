import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import Json

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create and retrieve orders from database
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database URL not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            order_number = body_data.get('order_number')
            customer_name = body_data.get('customer_name')
            phone = body_data.get('phone')
            address = body_data.get('address')
            items = body_data.get('items', [])
            total_amount = body_data.get('total_amount', 0)
            status = body_data.get('status', 'новый')
            
            cur.execute(
                "INSERT INTO orders (order_number, customer_name, phone, address, items, total_amount, status) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s) "
                "ON CONFLICT (order_number) DO UPDATE SET "
                "customer_name = EXCLUDED.customer_name, "
                "phone = EXCLUDED.phone, "
                "address = EXCLUDED.address, "
                "items = EXCLUDED.items, "
                "total_amount = EXCLUDED.total_amount, "
                "status = EXCLUDED.status, "
                "updated_at = CURRENT_TIMESTAMP "
                "RETURNING id",
                (order_number, customer_name, phone, address, Json(items), total_amount, status)
            )
            
            order_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': order_id,
                    'order_number': order_number,
                    'status': status
                }),
                'isBase64Encoded': False
            }
        
        if method == 'GET':
            cur.execute(
                "SELECT id, order_number, customer_name, phone, address, items, total_amount, status, created_at "
                "FROM orders ORDER BY created_at DESC LIMIT 50"
            )
            
            orders = []
            for row in cur.fetchall():
                orders.append({
                    'id': row[0],
                    'order_number': row[1],
                    'customer_name': row[2],
                    'phone': row[3],
                    'address': row[4],
                    'items': row[5],
                    'total_amount': row[6],
                    'status': row[7],
                    'created_at': row[8].isoformat() if row[8] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'orders': orders}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()