# NodeJS Backend Overview

## Key Functions

### 1. Login Functionality
- **Google OAuth**: 
  - Utilizes Google OAuth for user authentication, requiring credential registration at Google Cloud Console.
- **Passport Google Strategy**: 
  - Implements the `passport-google-oauth20` library to manage logins and restrict access to users with emails ending in `uef.edu.vn`.
- **JSON Web Token (JWT)**: 
  - Integrates JWT for secure user authentication and information transfer. Users receive a JWT upon successful login to use for subsequent requests.

### 2. User Interface After Login
- The homepage displays:
  - **Departments and Faculties**: Quick access to various departments for assistance.
  - **Articles**: Recent posts and updates.
  - **Useful Documents**: Highlighted based on user ratings.

### 3. Chat Functionality
- **Socket.io**: 
  - Establishes real-time connections for conversations between faculty, departments, and students.
- **Message Sending and File Attachment**: 
  - Supports sending messages and attaching documents in formats such as zip, pdf, docx, excel, and images (max size: 5MB).

### 4. Document Storage
- **Cloudinary**: 
  - Integrates the Cloudinary library for efficient storage and management of multimedia files, enhancing application performance compared to Base64 storage in the database.

### 5. Post Management
- **Posts**: 
  - Departments and faculties can publish articles about events or relevant information. Students can access departmental information directly through the chat interface.

### 6. Document Sharing
- **Document-Sharing**: 
  - Students can access and download course materials by subject, utilizing Cloudinary for document storage. The document rating feature allows users to easily find useful materials.

## Summary
The NodeJS backend provides secure login functionality, supports real-time communication, efficiently manages documents, and allows users to interact and share materials seamlessly.
