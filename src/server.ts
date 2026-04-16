import "dotenv/config";
import { createApp } from "./app";

const port = Number(process.env.PORT) || 3000;

function bootstrap() {
  const app = createApp();
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

bootstrap();

