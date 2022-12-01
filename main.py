from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

import tweepy
import json

with open('credentials.json') as f:
    config = json.load(f)

client = tweepy.Client(bearer_token=config['bearer_token'])

def queryJobs(query):
    query = query+' lang:en'
    tweets = client.search_recent_tweets(query=query, tweet_fields=['created_at'], max_results=10)

    jobs = []
    for i,tweet in enumerate(tweets.data):
        jobs.append({"id":i+1, "text": tweet.text, "created_at": tweet.created_at})    
    
    return jobs

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api", methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        result = queryJobs(request.get_json()["job"])
        return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)