TODO APP - VERCEL FRONTEND

1. Deploy your existing backend to Render.
2. Copy your Render backend URL, for example:
   https://your-backend-name.onrender.com
3. Open config.js and replace:
   https://YOUR-RENDER-BACKEND.onrender.com/api/todos
   with:
   https://your-backend-name.onrender.com/api/todos
4. Upload these frontend files to Vercel:
   index.html
   config.js
   script.js
   style.css

The existing UI and todo functionality have not been changed.
Only the API connection was separated into config.js.

IMPORTANT:
Do not put your MongoDB username/password in the frontend.
Keep MONGO_URI only in Render environment variables.
