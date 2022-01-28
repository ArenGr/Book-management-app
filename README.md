# Book management app (nestjs, postgresql, sequilize)
This is an example of how you may give instructions on setting up this project locally. 
To get a local copy up and running follow these simple example steps.

## Installation

1. Clone the repo :

   ```sh
   git clone https://github.com/ArenGr/Book-management-app 
   ```
2. Move into Book-management-app

    ```sh
    cd Book-management-app
    ```
3. Run npm install
    ```sh
    npm install
    ```
4. Set up your [PostgreSQL](https://www.postgresql.org/) database
   
5. Copy content from **.env.example** to **.env** and populate the required parameters

    ```sh
    cp .env.example .env
    ```
6. Run 
    ```sh
    npm run start:dev
    ```
### Let’s try it out…
Open your Postman application and make sure it's running.

#### Signup

Send a POST request to http://localhost:3000/api/v1/auth/signup and input your body data to create a user. You should get a token and the user object returned.

![image](https://user-images.githubusercontent.com/47744223/151629332-3a7d396b-1f7a-4894-8c6f-1e907f126796.png)


#### Signin

Send a POST request to http://localhost:3000/api/v1/auth/login and input just your username and password. You should get a token and the user object returned.
![image](https://user-images.githubusercontent.com/47744223/151629570-4580f0e1-ec67-47cc-8238-b0f0b4cbf91d.png)


#### Create a Book
```diff
-This route is protected, so it can't be accessed without the token.
```

![image](https://user-images.githubusercontent.com/47744223/151629749-95b94e0f-37a2-4032-b1fa-6edb300ff7fc.png)


#### Get a single Book

![image](https://user-images.githubusercontent.com/47744223/151629892-dbd7b26e-76c4-4c50-a5cb-886cc78dd0e0.png)


#### Get all Books

![image](https://user-images.githubusercontent.com/47744223/151630067-436b8dba-e5d1-41f6-a301-33deb6d70d80.png)


#### Update a Single Book
```diff
-This route is protected, so it can't be accessed without the token.
```

![image](https://user-images.githubusercontent.com/47744223/151630242-a7520951-8e87-4a9a-91fc-298c2f5b5d57.png)


#### Delete a Book
```diff
-This route is protected, so it can't be accessed without the token. Only the creator can delete it.
```

![image](https://user-images.githubusercontent.com/47744223/151630351-ba4e5dad-7a28-43b9-ab88-f47eee0956c5.png)





