define({ "api": [
  {
    "type": "post",
    "url": "/auth/token-delivery",
    "title": "Token delivery",
    "name": "TokenDelivery",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8080/auth/token-delivery"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "DELETE",
    "url": "/post/:id",
    "title": "Request Post delete",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/post/:id"
      }
    ],
    "name": "DeletePost",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/post/all",
    "title": "Request Post get all",
    "name": "GetAllPost",
    "group": "Post",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/post/all"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "post",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/post/:id",
    "title": "Request Post get",
    "name": "GetPost",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": 1,\n \"content\": \"La vie est belle\",\n \"location\": \"Paris\",\n \"createdAt\": \"2020-07-26T14:33:46.304Z\",\n \"updatedAt\": \"2020-07-26T14:33:46.304Z\",\n \"author\": 2\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "post",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8080/post/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/post/add",
    "title": "Request Post add",
    "name": "NewPost",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "author",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "string",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8080/post/add"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "put",
    "url": "/post/:id",
    "title": "Request Post update",
    "name": "UpdatePost",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Post content.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8080/post/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/user/add",
    "title": "Request Post add",
    "name": "NewUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8080/user/add"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
