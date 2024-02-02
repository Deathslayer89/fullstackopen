 04
 ```mermaid
 sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: HTTPS POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server-->>Browser: redirects to /notes
    Browser->>Server: HTTPS GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML Document 
    Browser->>Server: HTTPS GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: css file
    Note over Server, Browser :Browser executes the js file that fetches data.json
    Browser->>Server: HTTPS GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: {.........content.........}
    Note over Server,Browser: Browser executes callback functions to render notes
```
05
```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: Send SPA
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: Send main.css
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>Browser: Send spa.js
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Send data.json
    Note over Browser: Browser parses data.json and render through the notes by call back functions
```
06

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Note over Browser: On form submission, a new note is created, added to local notes, and event handler will send The new note to the server.
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server-->>Browser: Respond with status 201
    Note over Browser,Server: Browser adds new note and redraws notes
```


