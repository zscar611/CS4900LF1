Admin Specification

CLIENTSIDE SPECIFICATIONS:

Functional Requirements:
- the software shall allow admins to log in
- the software shall allow admins to create volunteer profiles
- the software shall allow admins to schedule volunteers
- the software shall allow admins to access volunteer profiles

User Interface Requirements:
- the software shall provide a means for admins to view all user profiles.
- the software shall allow admins to view volunteers checked in assignments.

Security Requirements:
- the software shall allow admins to create a profile with a unique username and phone number as the password.


SERVERSIDE SPECIFICATIONS:

Functional Requirements:
- the software shall store up to 6000 volunteer profiles in the volunteer database.
- the software shall store volunteer profiles as: 
    username: Alpha Numerical 6-16 characters, Not Capitalization specific, String
    phone number: 10 characters, int
    emergency contact: 10 characters, int
    first name: 32 characters, String
    last name: 32 characters, String
    total hours volunteered: Float
    Previous Appointment Areas: 32 characters, String
    Next Appointment Date: month/date/year, String
    Next Area: 32 characters, String
    Current Area: 32 chacarcters, String
    Current Checked In Status: 32 characters, String
- the software shall allow admins to create new volunteer profiles in the volunteer database(Assigning username, phone number, emergency contact, first name , and last name)
- the software shall allow admins to edit volunteer information
- the software shall allow admins to upload .csv files and store information in the volunteer database
- the software shall allow previous volunteer records (from before the development of the app) to be retroactively uploaded so a volunteer can see their past assignments
- The software shall allow a means for admins to generate reports on the upcoming weeks volunteer information (First and last name, current checked in status, current area, total hours, previous as well as next appointment).

User Interface Requirements:
- the software shall provide a means for admins to add and edit the database through a web page

Secuirty Requirements:
- the software shall save passwords/phone number in the volunteer database with encryption

![Admin](image.png)


