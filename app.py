from flask import Flask, render_template, request
import os
from flaskext.mysql import MySQL
import pymysql
from flask import jsonify

app = Flask(__name__)
mysql = MySQL()
mysql_database_host = 'MYSQL_DATABASE_HOST' in os.environ and os.environ['MYSQL_DATABASE_HOST'] or  'localhost'

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'admin'
app.config['MYSQL_DATABASE_DB'] = 'first'
app.config['MYSQL_DATABASE_HOST'] = 'db'
app.config['MYSQL_DATABASE_PORT']=int('3306')
mysql.init_app(app)

# Route to display HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle vaccination status check
@app.route('/check_vaccination', methods=['POST'])
def check_vaccination():
    # Get student name from form
    name = request.form['name']
    # Connect to database
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    
    # Query database for vaccination status
    cursor.execute("SELECT vaccinated FROM students WHERE name=%s", (name,))
    row = cursor.fetchone()
    if row is None:
        # If student name not found in database
        message = 'Student not found in database'
    else:
        # If student name found in database, display vaccination status
        # message = f"{name} is {row['vaccinated']} vaccinated"
        message = f"{name} is {row['vaccinated']} "

    # Close database connection
    cursor.close()
    conn.close()
    
    # Render HTML page with message
    return render_template('index.html', message=message)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
