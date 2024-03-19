import mysql.connector

# volunteer variable init
phoneNumber = None
userName = None
firstName = None
lastName = None
totalHours = None
nextApointment = None
nextArea = None
currentStatus = None
currentArea = None



# admin variable init
# TODO: ???

# Connecting to the test server
conn = mysql.connector.connect(user='root',
                               passwd='attic27',
                               host='localhost',
                               database='loavesandfish')

#cursor object
cursor = conn.cursor()



print(conn)

# Disconnecting from the server
conn.close()