import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';

export default function middleware() {
    return convert.compose(
        logger(),
        bodyParser(),
    );
}
