# Node.js TypeScript Project

This is a starter Node.js project using TypeScript.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run in development mode**:
    ```bash
    npm run dev
    ```

3.  **Build**:
    ```bash
    npm run build
    ```

4.  **Start production build**:
    ```bash
    npm start
    ```

## Error Handling

This project uses a custom `ApiError` class and `http-status` for standardized error responses.

### Usage

```typescript
import httpStatus from 'http-status';
import ApiError from './utils/apiError';

// Throwing a 404 Not Found error
throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');

// Throwing a 400 Bad Request error
throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid input');
```

### Common HTTP Status Reference

| Code | Name | Description |
| :--- | :--- | :--- |
| **200** | `httpStatus.OK` | Standard response for successful HTTP requests. |
| **201** | `httpStatus.CREATED` | The request has been fulfilled, resulting in the creation of a new resource. |
| **400** | `httpStatus.BAD_REQUEST` | The server cannot or will not process the request due to an apparent client error. |
| **401** | `httpStatus.UNAUTHORIZED` | Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. |
| **403** | `httpStatus.FORBIDDEN` | The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource. |
| **404** | `httpStatus.NOT_FOUND` | The requested resource could not be found but may be available in the future. |
| **500** | `httpStatus.INTERNAL_SERVER_ERROR` | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. |

## references

```
Error :- throw new ApiError(httpStatus.NOT_FOUND, "Bot not found");
Response :- res.status(httpStatus.OK).json({
    status_code: 200,
    message: "bot deleted successfully",
  });```



  ## .env file

  ```
MONGO_URI=mongodb+srv://RJGYM:RVRs3D5NTFSNPMfv@gms0.zltene9.mongodb.net/RJGYM?appName=GMS0
  ```
