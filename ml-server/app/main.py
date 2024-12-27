import os
from flask import Flask, request, jsonify
from chains import Chain
from portfolio import Portfolio
from pymongo import MongoClient
from flask_cors import CORS
import uuid
import random
from dotenv import load_dotenv

load_dotenv()

# Initialize Flask appcd a
app = Flask(__name__)
CORS(app,origins=[os.getenv("FRONTEND_URL")])


# Initialize instances of Chain and Portfolio
chain = Chain()
portfolio = Portfolio()

@app.route('/generate-reply', methods=['POST'])
def generate_reply():

    global id
    
    try:
        id = str(uuid.uuid4()) + str(random.randint(0,1000000))

        # Get the URL from the request body
        data = request.get_json()
        query = data.get('query')
        if not query:
            return jsonify({'error': 'message is required'}), 400
        
        portfolio.load_portfolio()
        results = []

        links = portfolio.query_links(query)
        reply = chain.write_reply(query, links)
        results.append({"query": query, "reply": reply})

        client = MongoClient("mongodb://localhost:27017/")
        db  = client["medlas"]
        collection = db["queries"]
        collection.insert_one({"query": query, "reply": reply , "_id": id})
        
        return jsonify({"success": True, "result": results})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    return jsonify({"status": "OK", "message": "API is running successfully."})

@app.route('/get-reply', methods=['GET'])
def get_reply():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db  = client["medlas"]
        collection = db["queries"]
        queries = collection.find({"_id": id})
        return jsonify({"success": True, "result": list(queries), "id": id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
