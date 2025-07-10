---
title: "Dynamic Web Authentication using JWT"
excerpt: "A deep dive into implementing secure and scalable authentication systems using JSON Web Tokens in modern web applications."
date: "2025-01-05"
category: "Web Development"
readTime: "10 min read"
tags: ["Backend", "Auth", "JWT"]
author: "Bishrant Ghimire"
---

# Dynamic Web Authentication using JWT

Before understanding all jargon such as JWT, header, payload, signature, tokens etc. Let us understand some basic stuffs first.

So what is authentication and how is different from authorization? They may sound the same but they are actually different, Authentication means just identifying a user through their credentials while authorization means authorizing to user to perform specific requests or ensuring if the user is permitted to access the resources or operations they are trying to access.

And what are encoding, encrypting and hashing and how are they different. 
Encoding means just transforming data from one form to another, it is done to make data readable by different systems. Data can be encoded to URL, Base-64 or other forms. Anyone who knows the method can decode an encoded message.
Encrypting means changing a data to a specific form which can only be decrypted we have a specific key to do so. Encryption is done to prevent unauthorized access to a data as only a key can be used to reverse a data.
Hashing is converting the data from one form to another but the data converted can not be converted into its original form. A data is usually passed through a one way function such as SHA-256 which changes it too a huge string. The string can not be changed to the original form. Hence hashing is uni-directional and small change in the original data and change a huge difference in the output string.

Now, we can understand JWT or JSON Web Tokens, JWT is a long token consisting of three parts consisting of three parts separated by dots(.) used for Authentication and Authorization.
The parts in a JWT are as follow:
1) A header
2) A payload
3) A signature

A header is a the part of a JWT which  contains the metadata: The algorithm used to create the signature and the type of token ie JWT

The payload consists of all important data such a the user Id , expiry data, issued date, roles and other important data as per required

The signature is the mechanism through which the payload is authenticated.

So, How do JSON Web Tokens work?
The header is encoded to base64URL form and same is done with the payload. and separated with a dot.

```
 base64URLencode(header) + "." + Base64URLencode(payload)
```

This data is fed to hash function along with a secret password only known to the server or trusted platform.

```
SIGNATURE = HashFunction( base64URLencode(header)+"."+Base64URLencode(payload),SecretCode
)
```

This produces a JWT which looks something like:

```
JWT =  base64URLencode(header) + "." + Base64URLencode(payload) + "." + SIGNATURE
```

Now, this JWT is given out to the local storage of the user during the time of login, this JWT is generally known as Access Token. Every time you open a website where authentication and authorization is required.
The Access Token is sent to the backend. The backend takes the encoded header and payload from the given access token, passes through the hash function with same secret code, if the new output for the signature is same as the signature in the access token required access is granted to the user.

JWT are stateless, what does stateless mean? JWTs are stateless because they don't require server-side sessions.Statelessness means the server **does not store session data**.Imagine there is a platform required many and many services, using JWT separate authorization is not required for all services, a single payload may have authorization for all services defined, hence all individual services should not be validated.

But that means if a access token is copied and sent to a server, you can impersonate someone easily. It is kind of true but then comes the role of refresh token. Generally, access tokens have a very small lifetime and are very short lived, during a the login process a separate token known as refresh token which is just a random hash generated is saved in the DB along with information such as username and also in the local device. After the Access token expires, the refresh token is sent, this issues a payload with new data(mostly issue date and expiry date), which updates the encoded version of the payload and then the signature. Generally the refresh token is also rotated and changed after JWT has changed at the particular time and this process is used to authenticate and authorize to you again and again without you typing the password ans username again and again. generally a refresh token can only be used once if it is rotated.

This is all what happens under the hood, but things are alot simpler now, there are two functions in a library of node known as npm jsonwebtokens which has made our job very very easy.

the two functions are

```
const token = jwt.sign(payload, jwtpassword)
```

and

```
const decoded = jwt.verify(token, jwtpassword)
```

here, the token constant stores the entire jwt token and decoded decodes the token and verifies it, .verify shall always be used inside of a try and catch wrapper.
