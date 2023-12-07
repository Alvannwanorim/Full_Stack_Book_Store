import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { BooksRoute } from './routes/books.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new BooksRoute()]);

app.listen();
