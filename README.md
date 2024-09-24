**Summary of Key Functions of NodeJS Backend**
_Login Functionality:_
- Google OAuth: Utilizes Google OAuth for login, requiring credentials registration at Google Cloud Console.
- Passport Google Strategy: Implements the passport-google-oauth20 library to manage logins and restrict access to users with emails ending in uef.edu.vn.
- JSON Web Token (JWT): Integrates JWT for user authentication and secure information transfer. Upon successful login, users receive a JWT to use for subsequent requests.
_Chat Functionality:_
- Socket.io: Establishes real-time connections for conversations between faculty, departments, and students.
- Message Sending and File Attachment: Supports sending messages and attaching documents in formats such as zip, pdf, docx, excel, and images, with a maximum size of 5MB.
_Document Storage:_
- Cloudinary: Integrates the Cloudinary library for storing and managing multimedia files, enhancing application performance compared to storing files as Base64 in the database.
_Post Management:_
- Posts: Departments and faculties can publish articles about events or relevant information. Students can access department information through the chat interface.
_Document Sharing:_
- Document-Sharing: Students can access and download materials by subject, utilizing Cloudinary for document storage. The document rating feature allows users to find useful materials easily.
