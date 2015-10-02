from flask import Flask, render_template, url_for, json, request
import urllib2

url = 'http://www.acme.com/products/3322'
host = 'http://kr.battle.net'

app = Flask(__name__)

'''
connection = pymongo.Connection('localhost', 27017)
todos = connection['demo']['todos']

def json_load(data):
    #return json.loads(data, object_hook=json_util.object_hook)

def json_dump(data):
    return json.dumps(data, default=json_util.default)
'''

@app.route('/')
def hello_world():
    return render_template('diablo3.html')

@app.route('/user/<string:id>')
def search_user(id):
    profileApi = '/api/d3/profile/'
    battleTag = id.replace('#', '-')
    
    servieUrl = host + profileApi + battleTag + "/"
    response = urllib2.urlopen(servieUrl).read()
    
    return response
    #return json_dump(list(todos.find()))

@app.route('/hero/<string:id>')
def search_hero(id):
    profileApi = '/api/d3/profile/'
    battleTag = id.replace('#', '-')
    battleTag = battleTag.replace('@', '/')
    
    servieUrl = host + profileApi + battleTag
    response = urllib2.urlopen(servieUrl).read()
    
    return response

'''
@app.route('/todos',  methods=['POST'])
def new_todo():
    todo = json_load(request.data)
    todos.save(todo)
    return json_dump(todo)

@app.route('/todos/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = json_load(request.data)
    todos.save(todo)
    return json_dump(todo)

@app.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todos.remove(ObjectId(todo_id))
    return ""
'''

if __name__ == '__main__':
    app.run(debug=True,port=8080)