import assert = require("assert");
import * as fs from "fs";
import * as events from "events";
import events2 = require("events");
import * as zlib from "zlib";
import * as url from "url";
import * as util from "util";
import * as tls from "tls";
import * as http from "http";
import * as https from "https";
import * as querystring from "querystring";
import * as path from "path";
import * as cluster from "cluster";
import * as os from "os";
import * as vm from "vm";
import * as console2 from "console";
import * as string_decoder from "string_decoder";
import * as timers from "timers";
import * as v8 from "v8";
import * as dns from "dns";
import * as async_hooks from "async_hooks";
import * as inspector from "inspector";
import * as trace_events from "trace_events";
import Module = require("module");

//////////////////////////////////////////////////////////
/// Assert Tests : https://nodejs.org/api/assert.html ///
//////////////////////////////////////////////////////////

{
    {
        assert(1 + 1 - 2 === 0, "The universe isn't how it should.");

        assert.deepEqual({ x: { y: 3 } }, { x: { y: 3 } }, "DEEP WENT DERP");

        assert.deepStrictEqual({ a: 1 }, { a: 1 }, "uses === comparator");

        assert.doesNotThrow(() => {
            const b = false;
            if (b) { throw new Error("a hammer at your face"); }
        }, () => 1, "What the...*crunch*");

        assert.equal(3, "3", "uses == comparator");

        assert.fail('stuff broke');

        assert.fail('actual', 'expected', 'message');

        assert.fail(1, 2, undefined, '>');

        assert.ifError(0);

        assert.notDeepStrictEqual({ x: { y: "3" } }, { x: { y: 3 } }, "uses !== comparator");

        assert.notEqual(1, 2, "uses != comparator");

        assert.notStrictEqual(2, "2", "uses === comparator");

        assert.ok(true);
        assert.ok(1);

        assert.strictEqual(1, 1, "uses === comparator");

        assert.throws(() => { throw new Error("a hammer at your face"); }, Error, "DODGED IT");

        assert.strict.strict.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
    }
}

////////////////////////////////////////////////////
/// Events tests : http://nodejs.org/api/events.html
////////////////////////////////////////////////////

{
    const emitter: events.EventEmitter = new events.EventEmitter();
    const event: string | symbol = '';
    const listener: (...args: any[]) => void = () => {};
    const any: any = 1;

    {
        let result: events.EventEmitter;

        result = emitter.addListener(event, listener);
        result = emitter.on(event, listener);
        result = emitter.once(event, listener);
        result = emitter.prependListener(event, listener);
        result = emitter.prependOnceListener(event, listener);
        result = emitter.removeListener(event, listener);
        result = emitter.off(event, listener);
        result = emitter.removeAllListeners();
        result = emitter.removeAllListeners(event);
        result = emitter.setMaxListeners(42);
    }

    {
        let result: number;

        result = events.EventEmitter.defaultMaxListeners;
        result = events.EventEmitter.listenerCount(emitter, event); // deprecated

        result = emitter.getMaxListeners();
        result = emitter.listenerCount(event);
    }

    {
        let result: Function[];

        result = emitter.listeners(event);
    }

    {
        let result: boolean;

        result = emitter.emit(event);
        result = emitter.emit(event, any);
        result = emitter.emit(event, any, any);
        result = emitter.emit(event, any, any, any);
    }

    {
        let result: Array<string | symbol>;

        result = emitter.eventNames();
    }

    {
        class Networker extends events.EventEmitter {
            constructor() {
                super();

                this.emit("mingling");
            }
        }
    }

    {
        new events2();
    }
}

////////////////////////////////////////////////////
/// File system tests : http://nodejs.org/api/fs.html
////////////////////////////////////////////////////

{
    {
        fs.writeFile("thebible.txt",
            "Do unto others as you would have them do unto you.",
            assert.ifError);

        fs.write(1234, "test", () => { });

        fs.writeFile("Harry Potter",
            "\"You be wizzing, Harry,\" jived Dumbledore.",
            {
                encoding: "ascii"
            },
            assert.ifError);

        fs.writeFile("testfile", "content", "utf8", assert.ifError);

        fs.writeFileSync("testfile", "content", "utf8");
        fs.writeFileSync("testfile", "content", { encoding: "utf8" });
        fs.writeFileSync("testfile", new DataView(new ArrayBuffer(1)), { encoding: "utf8" });
    }

    {
        fs.appendFile("testfile", "foobar", "utf8", assert.ifError);
        fs.appendFile("testfile", "foobar", { encoding: "utf8" }, assert.ifError);
        fs.appendFileSync("testfile", "foobar", "utf8");
        fs.appendFileSync("testfile", "foobar", { encoding: "utf8" });
    }

    {
        let content: string;
        let buffer: Buffer;
        let stringOrBuffer: string | Buffer;
        const nullEncoding: string | null = null;
        const stringEncoding: string | null = 'utf8';

        content = fs.readFileSync('testfile', 'utf8');
        content = fs.readFileSync('testfile', { encoding: 'utf8' });
        stringOrBuffer = fs.readFileSync('testfile', stringEncoding);
        stringOrBuffer = fs.readFileSync('testfile', { encoding: stringEncoding });

        buffer = fs.readFileSync('testfile');
        buffer = fs.readFileSync('testfile', null);
        buffer = fs.readFileSync('testfile', { encoding: null });
        stringOrBuffer = fs.readFileSync('testfile', nullEncoding);
        stringOrBuffer = fs.readFileSync('testfile', { encoding: nullEncoding });

        buffer = fs.readFileSync('testfile', { flag: 'r' });

        fs.readFile('testfile', 'utf8', (err, data) => content = data);
        fs.readFile('testfile', { encoding: 'utf8' }, (err, data) => content = data);
        fs.readFile('testfile', stringEncoding, (err, data) => stringOrBuffer = data);
        fs.readFile('testfile', { encoding: stringEncoding }, (err, data) => stringOrBuffer = data);

        fs.readFile('testfile', (err, data) => buffer = data);
        fs.readFile('testfile', null, (err, data) => buffer = data);
        fs.readFile('testfile', { encoding: null }, (err, data) => buffer = data);
        fs.readFile('testfile', nullEncoding, (err, data) => stringOrBuffer = data);
        fs.readFile('testfile', { encoding: nullEncoding }, (err, data) => stringOrBuffer = data);

        fs.readFile('testfile', { flag: 'r' }, (err, data) => buffer = data);
    }

    {
        fs.read(1, new DataView(new ArrayBuffer(1)), 0, 1, 0, (err: NodeJS.ErrnoException, bytesRead: number, buffer: DataView) => {});
    }

    {
        fs.readSync(1, new DataView(new ArrayBuffer(1)), 0, 1, 0);
    }

    {
        let errno: number;
        fs.readFile('testfile', (err, data) => {
            if (err && err.errno) {
                errno = err.errno;
            }
        });
    }

    {
        let listS: string[];
        listS = fs.readdirSync('path');
        listS = fs.readdirSync('path', { encoding: 'utf8' });
        listS = fs.readdirSync('path', { encoding: null });
        listS = fs.readdirSync('path', { encoding: undefined }) as string[];
        listS = fs.readdirSync('path', 'utf8');
        listS = fs.readdirSync('path', null);
        listS = fs.readdirSync('path', undefined);
        const listDir: fs.Dirent[] = fs.readdirSync('path', { withFileTypes: true });
        const listDir2: Buffer[] = fs.readdirSync('path', { withFileTypes: false, encoding: 'buffer' });

        let listB: Buffer[];
        listB = fs.readdirSync('path', { encoding: 'buffer' });
        listB = fs.readdirSync("path", 'buffer');

        const enc = 'buffer';
        fs.readdirSync('path', { encoding: enc });
        fs.readdirSync('path', { });

        fs.readdir('path', { withFileTypes: true }, (err: NodeJS.ErrnoException, files: fs.Dirent[]) => {});
    }
    {
        fs.mkdtemp('/tmp/foo-', (err, folder) => {
            console.log(folder);
            // Prints: /tmp/foo-itXde2
        });
    }

    {
        let tempDir: string;
        tempDir = fs.mkdtempSync('/tmp/foo-');
    }

    {
        fs.watch('/tmp/foo-', (event, filename) => {
            console.log(event, filename);
        });

        fs.watch('/tmp/foo-', 'utf8', (event, filename) => {
            console.log(event, filename);
        });

        fs.watch('/tmp/foo-', {
            recursive: true,
            persistent: true,
            encoding: 'utf8'
        }, (event, filename) => {
            console.log(event, filename);
        });
    }

    {
        fs.access('/path/to/folder', (err) => { });

        fs.access(Buffer.from(''), (err) => { });

        fs.access('/path/to/folder', fs.constants.F_OK | fs.constants.R_OK, (err) => { });

        fs.access(Buffer.from(''), fs.constants.F_OK | fs.constants.R_OK, (err) => { });

        fs.accessSync('/path/to/folder');

        fs.accessSync(Buffer.from(''));

        fs.accessSync('path/to/folder', fs.constants.W_OK | fs.constants.X_OK);

        fs.accessSync(Buffer.from(''), fs.constants.W_OK | fs.constants.X_OK);
    }

    {
        let s = '123';
        let b: Buffer;
        fs.readlink('/path/to/folder', (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', undefined, (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', 'utf8', (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', 'buffer', (err, linkString) => b = linkString);
        fs.readlink('/path/to/folder', s, (err, linkString) => typeof linkString === 'string' ? s = linkString : b = linkString);
        fs.readlink('/path/to/folder', {}, (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', { encoding: undefined }, (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', { encoding: 'utf8' }, (err, linkString) => s = linkString);
        fs.readlink('/path/to/folder', { encoding: 'buffer' }, (err, linkString) => b = linkString);
        fs.readlink('/path/to/folder', { encoding: s }, (err, linkString) => typeof linkString === "string" ? s = linkString : b = linkString);

        s = fs.readlinkSync('/path/to/folder');
        s = fs.readlinkSync('/path/to/folder', undefined);
        s = fs.readlinkSync('/path/to/folder', 'utf8');
        b = fs.readlinkSync('/path/to/folder', 'buffer');
        const v1 = fs.readlinkSync('/path/to/folder', s);
        typeof v1 === "string" ? s = v1 : b = v1;

        s = fs.readlinkSync('/path/to/folder', {});
        s = fs.readlinkSync('/path/to/folder', { encoding: undefined });
        s = fs.readlinkSync('/path/to/folder', { encoding: 'utf8' });
        b = fs.readlinkSync('/path/to/folder', { encoding: 'buffer' });
        const v2 = fs.readlinkSync('/path/to/folder', { encoding: s });
        typeof v2 === "string" ? s = v2 : b = v2;
    }

    {
        let s = '123';
        let b: Buffer;
        fs.realpath('/path/to/folder', (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', undefined, (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', 'utf8', (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', 'buffer', (err, resolvedPath) => b = resolvedPath);
        fs.realpath('/path/to/folder', s, (err, resolvedPath) => typeof resolvedPath === 'string' ? s = resolvedPath : b = resolvedPath);
        fs.realpath('/path/to/folder', {}, (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', { encoding: undefined }, (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', { encoding: 'utf8' }, (err, resolvedPath) => s = resolvedPath);
        fs.realpath('/path/to/folder', { encoding: 'buffer' }, (err, resolvedPath) => b = resolvedPath);
        fs.realpath('/path/to/folder', { encoding: s }, (err, resolvedPath) => typeof resolvedPath === "string" ? s = resolvedPath : b = resolvedPath);

        s = fs.realpathSync('/path/to/folder');
        s = fs.realpathSync('/path/to/folder', undefined);
        s = fs.realpathSync('/path/to/folder', 'utf8');
        b = fs.realpathSync('/path/to/folder', 'buffer');
        const v1 = fs.realpathSync('/path/to/folder', s);
        typeof v1 === "string" ? s = v1 : b = v1;

        s = fs.realpathSync('/path/to/folder', {});
        s = fs.realpathSync('/path/to/folder', { encoding: undefined });
        s = fs.realpathSync('/path/to/folder', { encoding: 'utf8' });
        b = fs.realpathSync('/path/to/folder', { encoding: 'buffer' });
        const v2 = fs.realpathSync('/path/to/folder', { encoding: s });
        typeof v2 === "string" ? s = v2 : b = v2;

        // native
        fs.realpath.native('/path/to/folder', (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', undefined, (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', 'utf8', (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', 'buffer', (err, resolvedPath) => b = resolvedPath);
        fs.realpath.native('/path/to/folder', s, (err, resolvedPath) => typeof resolvedPath === 'string' ? s = resolvedPath : b = resolvedPath);
        fs.realpath.native('/path/to/folder', {}, (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', { encoding: undefined }, (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', { encoding: 'utf8' }, (err, resolvedPath) => s = resolvedPath);
        fs.realpath.native('/path/to/folder', { encoding: 'buffer' }, (err, resolvedPath) => b = resolvedPath);
        fs.realpath.native('/path/to/folder', { encoding: s }, (err, resolvedPath) => typeof resolvedPath === "string" ? s = resolvedPath : b = resolvedPath);

        s = fs.realpathSync.native('/path/to/folder');
        s = fs.realpathSync.native('/path/to/folder', undefined);
        s = fs.realpathSync.native('/path/to/folder', 'utf8');
        b = fs.realpathSync.native('/path/to/folder', 'buffer');
        const v3 = fs.realpathSync.native('/path/to/folder', s);
        typeof v3 === "string" ? s = v3 : b = v3;

        s = fs.realpathSync.native('/path/to/folder', {});
        s = fs.realpathSync.native('/path/to/folder', { encoding: undefined });
        s = fs.realpathSync.native('/path/to/folder', { encoding: 'utf8' });
        b = fs.realpathSync.native('/path/to/folder', { encoding: 'buffer' });
        const v4 = fs.realpathSync.native('/path/to/folder', { encoding: s });
        typeof v4 === "string" ? s = v4 : b = v4;
    }

    {
        fs.copyFile('/path/to/src', '/path/to/dest', (err) => console.error(err));
        fs.copyFile('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_EXCL, (err) => console.error(err));
        fs.copyFile('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_FICLONE, (err) => console.error(err));
        fs.copyFile('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_FICLONE_FORCE, (err) => console.error(err));

        fs.copyFileSync('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_EXCL);
        fs.copyFileSync('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_FICLONE);
        fs.copyFileSync('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_FICLONE_FORCE);

        const cf = util.promisify(fs.copyFile);
        cf('/path/to/src', '/path/to/dest', fs.constants.COPYFILE_EXCL).then(console.log);
    }

    {
        fs.mkdir('some/test/path', {
            recursive: true,
            mode: 0o777,
        }, () => {
        });

        fs.mkdirSync('some/test/path', {
            recursive: true,
            mode: 0o777,
        });
    }
}

////////////////////////////////////////////////////
/// Url tests : http://nodejs.org/api/url.html
////////////////////////////////////////////////////

{
    {
        url.format(url.parse('http://www.example.com/xyz'));

        url.format('http://www.example.com/xyz');

        // https://google.com/search?q=you're%20a%20lizard%2C%20gary
        url.format({
            protocol: 'https',
            host: "google.com",
            pathname: 'search',
            query: { q: "you're a lizard, gary" }
        });

        const myURL = new url.URL('https://a:b@你好你好?abc#foo');
        url.format(myURL, { fragment: false, unicode: true, auth: false });
    }

    {
        const helloUrl = url.parse('http://example.com/?hello=world', true);
        let helloQuery = helloUrl.query['hello'];
        assert.equal(helloUrl.query['hello'], 'world');

        let strUrl = url.parse('http://example.com/?hello=world');
        let queryStr: string = strUrl.query!;

        strUrl = url.parse('http://example.com/?hello=world', false);
        queryStr = strUrl.query!;

        function getBoolean(): boolean { return false; }
        const urlUrl = url.parse('http://example.com/?hello=world', getBoolean());
        if (typeof(urlUrl.query) === 'string') {
            queryStr = urlUrl.query;
        } else if (urlUrl.query) {
            helloQuery = urlUrl.query['hello'];
        }
    }

    {
        const ascii: string = url.domainToASCII('español.com');
        const unicode: string = url.domainToUnicode('xn--espaol-zwa.com');
    }

    {
        let myURL = new url.URL('https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert.equal(myURL.hash, '#bar');
        assert.equal(myURL.host, 'example.org:81');
        assert.equal(myURL.hostname, 'example.org');
        assert.equal(myURL.href, 'https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert.equal(myURL.origin, 'https://example.org:81');
        assert.equal(myURL.password, 'thepwd');
        assert.equal(myURL.username, 'theuser');
        assert.equal(myURL.pathname, '/foo/path');
        assert.equal(myURL.port, "81");
        assert.equal(myURL.protocol, "https:");
        assert.equal(myURL.search, "?query=string");
        assert.equal(myURL.toString(), 'https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert(myURL.searchParams instanceof url.URLSearchParams);

        myURL.host = 'example.org:82';
        myURL.hostname = 'example.com';
        myURL.href = 'http://other.com';
        myURL.hash = 'baz';
        myURL.password = "otherpwd";
        myURL.username = "otheruser";
        myURL.pathname = "/otherPath";
        myURL.port = "82";
        myURL.protocol = "http";
        myURL.search = "a=b";
        assert.equal(myURL.href, 'http://otheruser:otherpwd@other.com:82/otherPath?a=b#baz');

        myURL = new url.URL('/foo', 'https://example.org/');
        assert.equal(myURL.href, 'https://example.org/foo');
        assert.equal(myURL.toJSON(), myURL.href);
    }

    {
        const searchParams = new url.URLSearchParams('abc=123');

        assert.equal(searchParams.toString(), 'abc=123');
        searchParams.forEach((value: string, name: string, me: url.URLSearchParams): void => {
            assert.equal(name, 'abc');
            assert.equal(value, '123');
            assert.equal(me, searchParams);
        });

        assert.equal(searchParams.get('abc'), '123');

        searchParams.append('abc', 'xyz');

        assert.deepEqual(searchParams.getAll('abc'), ['123', 'xyz']);

        const entries = searchParams.entries();
        assert.deepEqual(entries.next(), { value: ["abc", "123"], done: false });
        assert.deepEqual(entries.next(), { value: ["abc", "xyz"], done: false });
        assert.deepEqual(entries.next(), { value: undefined, done: true });

        const keys = searchParams.keys();
        assert.deepEqual(keys.next(), { value: "abc", done: false });
        assert.deepEqual(keys.next(), { value: "abc", done: false });
        assert.deepEqual(keys.next(), { value: undefined, done: true });

        const values = searchParams.values();
        assert.deepEqual(values.next(), { value: "123", done: false });
        assert.deepEqual(values.next(), { value: "xyz", done: false });
        assert.deepEqual(values.next(), { value: undefined, done: true });

        searchParams.set('abc', 'b');
        assert.deepEqual(searchParams.getAll('abc'), ['b']);

        searchParams.delete('a');
        assert(!searchParams.has('a'));
        assert.equal(searchParams.get('a'), null);

        searchParams.sort();
    }

    {
        const searchParams = new url.URLSearchParams({
            user: 'abc',
            query: ['first', 'second']
        });

        assert.equal(searchParams.toString(), 'user=abc&query=first%2Csecond');
        assert.deepEqual(searchParams.getAll('query'), ['first,second']);
    }

    {
        // Using an array
        const params = new url.URLSearchParams([
            ['user', 'abc'],
            ['query', 'first'],
            ['query', 'second'],
        // ts 2.1/2.* compatibility
        // tslint:disable-next-line no-unnecessary-type-assertion
        ] as Array<[string, string]>);
        assert.equal(params.toString(), 'user=abc&query=first&query=second');
    }

    {
        let path: string = url.fileURLToPath('file://test');
        path = url.fileURLToPath(new url.URL('file://test'));
    }

    {
        const path: url.URL = url.pathToFileURL('file://test');
    }
}

//////////////////////////////////////////////////////
/// Https tests : http://nodejs.org/api/https.html ///
//////////////////////////////////////////////////////

{
    let agent: https.Agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        maxCachedSessions: 100,
        timeout: 15000
    });

    agent = https.globalAgent;

    https.request({
        agent: false
    });
    https.request({
        agent
    });
    https.request({
        agent: undefined
    });

    https.get('http://www.example.com/xyz');
    https.request('http://www.example.com/xyz');

    https.get('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});
    https.request('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});

    https.get(new url.URL('http://www.example.com/xyz'));
    https.request(new url.URL('http://www.example.com/xyz'));

    https.get(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});
    https.request(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});

    const opts: https.RequestOptions = {
        path: '/some/path'
    };
    https.get(new url.URL('http://www.example.com'), opts);
    https.request(new url.URL('http://www.example.com'), opts);
    https.get(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});
    https.request(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});

    https.globalAgent.options.ca = [];

    {
        function reqListener(req: http.IncomingMessage, res: http.ServerResponse): void {}

        class MyIncomingMessage extends http.IncomingMessage {
            foo: number;
        }

        class MyServerResponse extends http.ServerResponse {
            foo: string;
        }

        let server = new https.Server({ IncomingMessage: MyIncomingMessage});

        server = new https.Server({
            IncomingMessage: MyIncomingMessage,
            ServerResponse: MyServerResponse
        }, reqListener);

        server = https.createServer({ IncomingMessage: MyIncomingMessage });
        server = https.createServer({ ServerResponse: MyServerResponse }, reqListener);

        const timeout: number = server.timeout;
        const listening: boolean = server.listening;
        const keepAliveTimeout: number = server.keepAliveTimeout;
        server.setTimeout().setTimeout(1000).setTimeout(() => {}).setTimeout(100, () => {});
    }
}

////////////////////////////////////////////////////
/// Querystring tests : https://nodejs.org/api/querystring.html
////////////////////////////////////////////////////

{
    interface SampleObject { a: string; }

    {
        const obj: SampleObject = { a: "" };
        const sep = '';
        const eq = '';
        const options: querystring.StringifyOptions = {};
        let result: string;

        result = querystring.stringify(obj);
        result = querystring.stringify(obj, sep);
        result = querystring.stringify(obj, sep, eq);
        result = querystring.stringify(obj, sep, eq);
        result = querystring.stringify(obj, sep, eq, options);
    }

    {
        const str = '';
        const sep = '';
        const eq = '';
        const options: querystring.ParseOptions = {};
        let result: querystring.ParsedUrlQuery;

        result = querystring.parse(str);
        result = querystring.parse(str, sep);
        result = querystring.parse(str, sep, eq);
        result = querystring.parse(str, sep, eq, options);
    }

    {
        const str = '';
        let result: string;

        result = querystring.escape(str);
        result = querystring.unescape(str);
    }
}

////////////////////////////////////////////////////
/// path tests : http://nodejs.org/api/path.html
////////////////////////////////////////////////////

{
    path.normalize('/foo/bar//baz/asdf/quux/..');

    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
    // returns
    // '/foo/bar/baz/asdf'

    try {
        path.join('foo', 'bar');
    } catch (error) { }

    path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
    // Is similar to:
    //
    // cd foo/bar
    // cd /tmp/file/
    // cd ..
    //    cd a/../subfile
    // pwd

    path.resolve('/foo/bar', './baz');
    // returns
    //    '/foo/bar/baz'

    path.resolve('/foo/bar', '/tmp/file/');
    // returns
    //    '/tmp/file'

    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    // if currently in /home/myself/node, it returns
    //    '/home/myself/node/wwwroot/static_files/gif/image.gif'

    path.isAbsolute('/foo/bar'); // true
    path.isAbsolute('/baz/..');  // true
    path.isAbsolute('qux/');     // false
    path.isAbsolute('.');        // false

    path.isAbsolute('//server');  // true
    path.isAbsolute('C:/foo/..'); // true
    path.isAbsolute('bar\\baz');   // false
    path.isAbsolute('.');         // false

    path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
    // returns
    //    '..\\..\\impl\\bbb'

    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
    // returns
    //    '../../impl/bbb'

    path.dirname('/foo/bar/baz/asdf/quux');
    // returns
    //    '/foo/bar/baz/asdf'

    path.basename('/foo/bar/baz/asdf/quux.html');
    // returns
    //    'quux.html'

    path.basename('/foo/bar/baz/asdf/quux.html', '.html');
    // returns
    //    'quux'

    path.extname('index.html');
    // returns
    //    '.html'

    path.extname('index.coffee.md');
    // returns
    //    '.md'

    path.extname('index.');
    // returns
    //    '.'

    path.extname('index');
    // returns
    //    ''

    'foo/bar/baz'.split(path.sep);
    // returns
    //        ['foo', 'bar', 'baz']

    'foo\\bar\\baz'.split(path.sep);
    // returns
    //        ['foo', 'bar', 'baz']

    process.env["PATH"]; // $ExpectType string | undefined

    path.parse('/home/user/dir/file.txt');
    // returns
    //    {
    //        root : "/",
    //        dir : "/home/user/dir",
    //        base : "file.txt",
    //        ext : ".txt",
    //        name : "file"
    //    }

    path.parse('C:\\path\\dir\\index.html');
    // returns
    //    {
    //        root : "C:\",
    //        dir : "C:\path\dir",
    //        base : "index.html",
    //        ext : ".html",
    //        name : "index"
    //    }

    path.format({
        root: "/",
        dir: "/home/user/dir",
        base: "file.txt",
        ext: ".txt",
        name: "file"
    });
    // returns
    //    '/home/user/dir/file.txt'

    path.format({
        root: "/",
        dir: "/home/user/dir",
        ext: ".txt",
        name: "file"
    });
    // returns
    //    '/home/user/dir/file.txt'

    path.format({
        dir: "/home/user/dir",
        base: "file.txt"
    });
    // returns
    //    '/home/user/dir/file.txt'

    path.posix.format({
        root: "/",
        dir: "/home/user/dir",
        base: "file.txt",
        ext: ".txt",
        name: "file"
    });
    // returns
    //    '/home/user/dir/file.txt'

    path.posix.format({
        dir: "/home/user/dir",
        base: "file.txt"
    });
    // returns
    //    '/home/user/dir/file.txt'

    path.win32.format({
        root: "C:\\",
        dir: "C:\\home\\user\\dir",
        ext: ".txt",
        name: "file"
    });
    // returns
    //    'C:\home\user\dir\file.txt'

    path.win32.format({
        dir: "C:\\home\\user\\dir",
        base: "file.txt"
    });
    // returns
    //    'C:\home\user\dir\file.txt'
}

////////////////////////////////////////////////////
/// string_decoder tests : https://nodejs.org/api/string_decoder.html
////////////////////////////////////////////////////

{
    const StringDecoder = string_decoder.StringDecoder;
    const buffer = new Buffer('test');
    const decoder1 = new StringDecoder();
    const decoder2 = new StringDecoder('utf8');
    const part1: string = decoder1.write(new Buffer('test'));
    const end1: string = decoder1.end();
    const part2: string = decoder2.write(new Buffer('test'));
    const end2: string = decoder1.end(new Buffer('test'));
}

//////////////////////////////////////////////////////////////////////
/// cluster tests: https://nodejs.org/api/cluster.html ///
//////////////////////////////////////////////////////////////////////

{
    {
        cluster.fork();
        Object.keys(cluster.workers).forEach(key => {
            const worker = cluster.workers[key];
            if (worker && worker.isDead()) {
                console.log('worker %d is dead', worker.process.pid);
            }
        });
    }
}

////////////////////////////////////////////////////
/// os tests : https://nodejs.org/api/os.html
////////////////////////////////////////////////////

{
    {
        let result: string;

        result = os.tmpdir();
        result = os.homedir();
        result = os.endianness();
        result = os.hostname();
        result = os.type();
        result = os.arch();
        result = os.release();
        result = os.EOL;
    }

    {
        let result: number;

        result = os.uptime();
        result = os.totalmem();
        result = os.freemem();
    }

    {
        let result: number[];

        result = os.loadavg();
    }

    {
        let result: os.CpuInfo[];

        result = os.cpus();
    }

    {
        let result: { [index: string]: os.NetworkInterfaceInfo[] };

        result = os.networkInterfaces();
    }

    {
        let result: number;

        result = os.constants.signals.SIGHUP;
        result = os.constants.signals.SIGINT;
        result = os.constants.signals.SIGQUIT;
        result = os.constants.signals.SIGILL;
        result = os.constants.signals.SIGTRAP;
        result = os.constants.signals.SIGABRT;
        result = os.constants.signals.SIGIOT;
        result = os.constants.signals.SIGBUS;
        result = os.constants.signals.SIGFPE;
        result = os.constants.signals.SIGKILL;
        result = os.constants.signals.SIGUSR1;
        result = os.constants.signals.SIGSEGV;
        result = os.constants.signals.SIGUSR2;
        result = os.constants.signals.SIGPIPE;
        result = os.constants.signals.SIGALRM;
        result = os.constants.signals.SIGTERM;
        result = os.constants.signals.SIGCHLD;
        result = os.constants.signals.SIGSTKFLT;
        result = os.constants.signals.SIGCONT;
        result = os.constants.signals.SIGSTOP;
        result = os.constants.signals.SIGTSTP;
        result = os.constants.signals.SIGTTIN;
        result = os.constants.signals.SIGTTOU;
        result = os.constants.signals.SIGURG;
        result = os.constants.signals.SIGXCPU;
        result = os.constants.signals.SIGXFSZ;
        result = os.constants.signals.SIGVTALRM;
        result = os.constants.signals.SIGPROF;
        result = os.constants.signals.SIGWINCH;
        result = os.constants.signals.SIGIO;
        result = os.constants.signals.SIGPOLL;
        result = os.constants.signals.SIGPWR;
        result = os.constants.signals.SIGSYS;
        result = os.constants.signals.SIGUNUSED;
    }

    {
        let result: number;

        result = os.constants.errno.E2BIG;
        result = os.constants.errno.EACCES;
        result = os.constants.errno.EADDRINUSE;
        result = os.constants.errno.EADDRNOTAVAIL;
        result = os.constants.errno.EAFNOSUPPORT;
        result = os.constants.errno.EAGAIN;
        result = os.constants.errno.EALREADY;
        result = os.constants.errno.EBADF;
        result = os.constants.errno.EBADMSG;
        result = os.constants.errno.EBUSY;
        result = os.constants.errno.ECANCELED;
        result = os.constants.errno.ECHILD;
        result = os.constants.errno.ECONNABORTED;
        result = os.constants.errno.ECONNREFUSED;
        result = os.constants.errno.ECONNRESET;
        result = os.constants.errno.EDEADLK;
        result = os.constants.errno.EDESTADDRREQ;
        result = os.constants.errno.EDOM;
        result = os.constants.errno.EDQUOT;
        result = os.constants.errno.EEXIST;
        result = os.constants.errno.EFAULT;
        result = os.constants.errno.EFBIG;
        result = os.constants.errno.EHOSTUNREACH;
        result = os.constants.errno.EIDRM;
        result = os.constants.errno.EILSEQ;
        result = os.constants.errno.EINPROGRESS;
        result = os.constants.errno.EINTR;
        result = os.constants.errno.EINVAL;
        result = os.constants.errno.EIO;
        result = os.constants.errno.EISCONN;
        result = os.constants.errno.EISDIR;
        result = os.constants.errno.ELOOP;
        result = os.constants.errno.EMFILE;
        result = os.constants.errno.EMLINK;
        result = os.constants.errno.EMSGSIZE;
        result = os.constants.errno.EMULTIHOP;
        result = os.constants.errno.ENAMETOOLONG;
        result = os.constants.errno.ENETDOWN;
        result = os.constants.errno.ENETRESET;
        result = os.constants.errno.ENETUNREACH;
        result = os.constants.errno.ENFILE;
        result = os.constants.errno.ENOBUFS;
        result = os.constants.errno.ENODATA;
        result = os.constants.errno.ENODEV;
        result = os.constants.errno.ENOENT;
        result = os.constants.errno.ENOEXEC;
        result = os.constants.errno.ENOLCK;
        result = os.constants.errno.ENOLINK;
        result = os.constants.errno.ENOMEM;
        result = os.constants.errno.ENOMSG;
        result = os.constants.errno.ENOPROTOOPT;
        result = os.constants.errno.ENOSPC;
        result = os.constants.errno.ENOSR;
        result = os.constants.errno.ENOSTR;
        result = os.constants.errno.ENOSYS;
        result = os.constants.errno.ENOTCONN;
        result = os.constants.errno.ENOTDIR;
        result = os.constants.errno.ENOTEMPTY;
        result = os.constants.errno.ENOTSOCK;
        result = os.constants.errno.ENOTSUP;
        result = os.constants.errno.ENOTTY;
        result = os.constants.errno.ENXIO;
        result = os.constants.errno.EOPNOTSUPP;
        result = os.constants.errno.EOVERFLOW;
        result = os.constants.errno.EPERM;
        result = os.constants.errno.EPIPE;
        result = os.constants.errno.EPROTO;
        result = os.constants.errno.EPROTONOSUPPORT;
        result = os.constants.errno.EPROTOTYPE;
        result = os.constants.errno.ERANGE;
        result = os.constants.errno.EROFS;
        result = os.constants.errno.ESPIPE;
        result = os.constants.errno.ESRCH;
        result = os.constants.errno.ESTALE;
        result = os.constants.errno.ETIME;
        result = os.constants.errno.ETIMEDOUT;
        result = os.constants.errno.ETXTBSY;
        result = os.constants.errno.EWOULDBLOCK;
        result = os.constants.errno.EXDEV;
    }

    {
        const prio = os.getPriority();
        os.setPriority(prio + 1);

        const prio2 = os.getPriority(1);
        os.setPriority(2, prio + 1);

        os.setPriority(os.constants.priority.PRIORITY_LOW);
    }
}

////////////////////////////////////////////////////
/// vm tests : https://nodejs.org/api/vm.html
////////////////////////////////////////////////////

{
    {
        const sandbox = {
            animal: 'cat',
            count: 2
        };

        const context = vm.createContext(sandbox);
        console.log(vm.isContext(context));
        const script = new vm.Script('count += 1; name = "kitty"');

        for (let i = 0; i < 10; ++i) {
            script.runInContext(context);
        }

        console.log(util.inspect(sandbox));

        vm.runInNewContext('count += 1; name = "kitty"', sandbox);
        console.log(util.inspect(sandbox));
    }

    {
        const sandboxes = [{}, {}, {}];

        const script = new vm.Script('globalVar = "set"');

        sandboxes.forEach((sandbox) => {
            script.runInNewContext(sandbox);
            script.runInThisContext();
        });

        console.log(util.inspect(sandboxes));

        const localVar = 'initial value';
        vm.runInThisContext('localVar = "vm";');

        console.log(localVar);
    }

    {
        vm.runInThisContext('console.log("hello world"', './my-file.js');
    }

    {
        const fn: Function = vm.compileFunction('console.log("test")', [], {
            parsingContext: vm.createContext(),
            contextExtensions: [{
                a: 1,
            }],
            produceCachedData: false,
            cachedData: Buffer.from('nope'),
        });
    }
}

/////////////////////////////////////////////////////
/// Timers tests : https://nodejs.org/api/timers.html
/////////////////////////////////////////////////////

{
    {
        const immediateId = timers.setImmediate(() => { console.log("immediate"); });
        timers.clearImmediate(immediateId);
    }
    {
        const counter = 0;
        const timeout = timers.setInterval(() => { console.log("interval"); }, 20);
        timeout.unref();
        timeout.ref();
        timers.clearInterval(timeout);
    }
    {
        const counter = 0;
        const timeout = timers.setTimeout(() => { console.log("timeout"); }, 20);
        timeout.unref();
        timeout.ref();
        timers.clearTimeout(timeout);
    }
    async function testPromisify() {
        const setTimeout = util.promisify(timers.setTimeout);
        let v: void = await setTimeout(100); // tslint:disable-line no-void-expression void-return
        let s: string = await setTimeout(100, "");

        const setImmediate = util.promisify(timers.setImmediate);
        v = await setImmediate(); // tslint:disable-line no-void-expression
        s = await setImmediate("");
    }
}

/////////////////////////////////////////////////////////
/// Errors Tests : https://nodejs.org/api/errors.html ///
/////////////////////////////////////////////////////////

{
    {
        Error.stackTraceLimit = Infinity;
    }
    {
        const myObject = {};
        Error.captureStackTrace(myObject);
    }
    {
        const frames: NodeJS.CallSite[] = [];
        Error.prepareStackTrace!(new Error(), frames);
    }
    {
        const frame: NodeJS.CallSite = null!;
        const frameThis: any = frame.getThis();
        const typeName: string | null  = frame.getTypeName();
        const func: Function | undefined  = frame.getFunction();
        const funcName: string | null = frame.getFunctionName();
        const meth: string | null  = frame.getMethodName();
        const fname: string | null  = frame.getFileName();
        const lineno: number | null  = frame.getLineNumber();
        const colno: number | null  = frame.getColumnNumber();
        const evalOrigin: string | undefined  = frame.getEvalOrigin();
        const isTop: boolean = frame.isToplevel();
        const isEval: boolean = frame.isEval();
        const isNative: boolean = frame.isNative();
        const isConstr: boolean = frame.isConstructor();
    }
}

///////////////////////////////////////////////////////////
/// Process Tests : https://nodejs.org/api/process.html ///
///////////////////////////////////////////////////////////

import * as p from "process";
{
    {
        let eventEmitter: events.EventEmitter;
        eventEmitter = process;                // Test that process implements EventEmitter...

        let _p: NodeJS.Process = process;
        _p = p;
    }
    {
        assert(process.argv[0] === process.argv0);
    }
    {
        let module: NodeModule | undefined;
        module = process.mainModule;
    }
    {
        process.on("message", (req: any) => { });
        process.addListener("beforeExit", (code: number) => { });
        process.once("disconnect", () => { });
        process.prependListener("exit", (code: number) => { });
        process.prependOnceListener("rejectionHandled", (promise: Promise<any>) => { });
        process.on("uncaughtException", (error: Error) => { });
        process.addListener("unhandledRejection", (reason: any, promise: Promise<any>) => { });
        process.once("warning", (warning: Error) => { });
        process.prependListener("message", (message: any, sendHandle: any) => { });
        process.prependOnceListener("SIGBREAK", () => { });
        process.on("newListener", (event: string | symbol, listener: Function) => { });
        process.once("removeListener", (event: string | symbol, listener: Function) => { });
        process.on("multipleResolves", (type: NodeJS.MultipleResolveType, prom: Promise<any>, value: any) => {});

        const listeners = process.listeners('uncaughtException');
        const oldHandler = listeners[listeners.length - 1];
        process.addListener('uncaughtException', oldHandler);
    }
    {
        function myCb(err: Error): void {
        }
        process.setUncaughtExceptionCaptureCallback(myCb);
        process.setUncaughtExceptionCaptureCallback(null);
        const b: boolean = process.hasUncaughtExceptionCaptureCallback();
    }
    {
        // process.allowedNodeEnvironmentFlags.has('asdf');
    }
}

///////////////////////////////////////////////////////////
/// Console Tests : https://nodejs.org/api/console.html ///
///////////////////////////////////////////////////////////

{
    {
        let _c: Console = console;
        _c = console2;
    }
    {
        const writeStream = fs.createWriteStream('./index.d.ts');
        let consoleInstance: Console = new console.Console(writeStream);

        consoleInstance = new console.Console(writeStream, writeStream);
        consoleInstance = new console.Console(writeStream, writeStream, true);
        consoleInstance = new console.Console({
            stdout: writeStream,
            stderr: writeStream,
            colorMode: 'auto',
            ignoreErrors: true
        });
        consoleInstance = new console.Console({
            stdout: writeStream,
            colorMode: false
        });
        consoleInstance = new console.Console({
            stdout: writeStream
        });
    }
    {
        console.assert('value');
        console.assert('value', 'message');
        console.assert('value', 'message', 'foo', 'bar');
        console.clear();
        console.count();
        console.count('label');
        console.countReset();
        console.countReset('label');
        console.debug();
        console.debug('message');
        console.debug('message', 'foo', 'bar');
        console.dir('obj');
        console.dir('obj', { depth: 1 });
        console.error();
        console.error('message');
        console.error('message', 'foo', 'bar');
        console.group();
        console.group('label');
        console.group('label1', 'label2');
        console.groupCollapsed();
        console.groupEnd();
        console.info();
        console.info('message');
        console.info('message', 'foo', 'bar');
        console.log();
        console.log('message');
        console.log('message', 'foo', 'bar');
        console.table({ foo: 'bar' });
        console.table([{ foo: 'bar' }]);
        console.table([{ foo: 'bar' }], ['foo']);
        console.time();
        console.time('label');
        console.timeEnd();
        console.timeEnd('label');
        console.timeLog();
        console.timeLog('label');
        console.timeLog('label', 'foo', 'bar');
        console.trace();
        console.trace('message');
        console.trace('message', 'foo', 'bar');
        console.warn();
        console.warn('message');
        console.warn('message', 'foo', 'bar');

        // --- Inspector mode only ---
        console.markTimeline();
        console.markTimeline('label');
        console.profile();
        console.profile('label');
        console.profileEnd();
        console.profileEnd('label');
        console.timeStamp();
        console.timeStamp('label');
        console.timeline();
        console.timeline('label');
        console.timelineEnd();
        console.timelineEnd('label');
    }
}

///////////////////////////////////////////////////
/// DNS Tests : https://nodejs.org/api/dns.html ///
///////////////////////////////////////////////////

{
    dns.lookup("nodejs.org", (err, address, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", 4, (err, address, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", 6, (err, address, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", {}, (err, address, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup(
        "nodejs.org",
        {
            family: 4,
            hints: dns.ADDRCONFIG | dns.V4MAPPED,
            all: false
        },
        (err, address, family) => {
            const _err: NodeJS.ErrnoException = err;
            const _address: string = address;
            const _family: number = family;
        }
    );
    dns.lookup("nodejs.org", { all: true }, (err, addresses) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: dns.LookupAddress[] = addresses;
    });
    dns.lookup("nodejs.org", { all: true, verbatim: true }, (err, addresses) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: dns.LookupAddress[] = addresses;
    });

    function trueOrFalse(): boolean {
        return Math.random() > 0.5 ? true : false;
    }
    dns.lookup("nodejs.org", { all: trueOrFalse() }, (err, addresses, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _addresses: string | dns.LookupAddress[] = addresses;
        const _family: number | undefined = family;
    });

    dns.lookupService("127.0.0.1", 0, (err, hostname, service) => {
        const _err: NodeJS.ErrnoException = err;
        const _hostname: string = hostname;
        const _service: string = service;
    });

    dns.resolve("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "A", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "AAAA", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "ANY", (err, addresses) => {
        const _addresses: dns.AnyRecord[] = addresses;
    });
    dns.resolve("nodejs.org", "MX", (err, addresses) => {
        const _addresses: dns.MxRecord[] = addresses;
    });

    dns.resolve4("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve4("nodejs.org", { ttl: true }, (err, addresses) => {
        const _addresses: dns.RecordWithTtl[] = addresses;
    });
    {
        const ttl = false;
        dns.resolve4("nodejs.org", { ttl }, (err, addresses) => {
            const _addresses: string[] | dns.RecordWithTtl[] = addresses;
        });
    }

    dns.resolve6("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve6("nodejs.org", { ttl: true }, (err, addresses) => {
        const _addresses: dns.RecordWithTtl[] = addresses;
    });
    {
        const ttl = false;
        dns.resolve6("nodejs.org", { ttl }, (err, addresses) => {
            const _addresses: string[] | dns.RecordWithTtl[] = addresses;
        });
    }
    {
        const resolver = new dns.Resolver();
        resolver.setServers(["4.4.4.4"]);
        resolver.resolve("nodejs.org", (err, addresses) => {
            const _addresses: string[] = addresses;
        });
        resolver.cancel();
    }
}

/*****************************************************************************
 *                                                                           *
 * The following tests are the modules not mentioned in document but existed *
 *                                                                           *
 *****************************************************************************/

///////////////////////////////////////////////////////////
/// Constants Tests                                     ///
///////////////////////////////////////////////////////////

import * as constants from 'constants';
{
    let str: string;
    let num: number;
    num = constants.SIGHUP;
    num = constants.SIGINT;
    num = constants.SIGQUIT;
    num = constants.SIGILL;
    num = constants.SIGTRAP;
    num = constants.SIGABRT;
    num = constants.SIGIOT;
    num = constants.SIGBUS;
    num = constants.SIGFPE;
    num = constants.SIGKILL;
    num = constants.SIGUSR1;
    num = constants.SIGSEGV;
    num = constants.SIGUSR2;
    num = constants.SIGPIPE;
    num = constants.SIGALRM;
    num = constants.SIGTERM;
    num = constants.SIGCHLD;
    num = constants.SIGSTKFLT;
    num = constants.SIGCONT;
    num = constants.SIGSTOP;
    num = constants.SIGTSTP;
    num = constants.SIGTTIN;
    num = constants.SIGTTOU;
    num = constants.SIGURG;
    num = constants.SIGXCPU;
    num = constants.SIGXFSZ;
    num = constants.SIGVTALRM;
    num = constants.SIGPROF;
    num = constants.SIGWINCH;
    num = constants.SIGIO;
    num = constants.SIGPOLL;
    num = constants.SIGPWR;
    num = constants.SIGSYS;
    num = constants.SIGUNUSED;
    num = constants.O_RDONLY;
    num = constants.O_WRONLY;
    num = constants.O_RDWR;
    num = constants.S_IFMT;
    num = constants.S_IFREG;
    num = constants.S_IFDIR;
    num = constants.S_IFCHR;
    num = constants.S_IFBLK;
    num = constants.S_IFIFO;
    num = constants.S_IFLNK;
    num = constants.S_IFSOCK;
    num = constants.O_CREAT;
    num = constants.O_EXCL;
    num = constants.O_NOCTTY;
    num = constants.O_TRUNC;
    num = constants.O_APPEND;
    num = constants.O_DIRECTORY;
    num = constants.O_NOATIME;
    num = constants.O_NOFOLLOW;
    num = constants.O_SYNC;
    num = constants.O_DSYNC;
    num = constants.O_DIRECT;
    num = constants.O_NONBLOCK;
    num = constants.S_IRWXU;
    num = constants.S_IRUSR;
    num = constants.S_IWUSR;
    num = constants.S_IXUSR;
    num = constants.S_IRWXG;
    num = constants.S_IRGRP;
    num = constants.S_IWGRP;
    num = constants.S_IXGRP;
    num = constants.S_IRWXO;
    num = constants.S_IROTH;
    num = constants.S_IWOTH;
    num = constants.S_IXOTH;
    num = constants.F_OK;
    num = constants.R_OK;
    num = constants.W_OK;
    num = constants.X_OK;
    num = constants.SSL_OP_ALL;
    num = constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION;
    num = constants.SSL_OP_CIPHER_SERVER_PREFERENCE;
    num = constants.SSL_OP_CISCO_ANYCONNECT;
    num = constants.SSL_OP_COOKIE_EXCHANGE;
    num = constants.SSL_OP_CRYPTOPRO_TLSEXT_BUG;
    num = constants.SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS;
    num = constants.SSL_OP_EPHEMERAL_RSA;
    num = constants.SSL_OP_LEGACY_SERVER_CONNECT;
    num = constants.SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER;
    num = constants.SSL_OP_MICROSOFT_SESS_ID_BUG;
    num = constants.SSL_OP_MSIE_SSLV2_RSA_PADDING;
    num = constants.SSL_OP_NETSCAPE_CA_DN_BUG;
    num = constants.SSL_OP_NETSCAPE_CHALLENGE_BUG;
    num = constants.SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG;
    num = constants.SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG;
    num = constants.SSL_OP_NO_COMPRESSION;
    num = constants.SSL_OP_NO_QUERY_MTU;
    num = constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
    num = constants.SSL_OP_NO_SSLv2;
    num = constants.SSL_OP_NO_SSLv3;
    num = constants.SSL_OP_NO_TICKET;
    num = constants.SSL_OP_NO_TLSv1;
    num = constants.SSL_OP_NO_TLSv1_1;
    num = constants.SSL_OP_NO_TLSv1_2;
    num = constants.SSL_OP_PKCS1_CHECK_1;
    num = constants.SSL_OP_PKCS1_CHECK_2;
    num = constants.SSL_OP_SINGLE_DH_USE;
    num = constants.SSL_OP_SINGLE_ECDH_USE;
    num = constants.SSL_OP_SSLEAY_080_CLIENT_DH_BUG;
    num = constants.SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG;
    num = constants.SSL_OP_TLS_BLOCK_PADDING_BUG;
    num = constants.SSL_OP_TLS_D5_BUG;
    num = constants.SSL_OP_TLS_ROLLBACK_BUG;
    num = constants.ENGINE_METHOD_RSA;
    num = constants.ENGINE_METHOD_DSA;
    num = constants.ENGINE_METHOD_DH;
    num = constants.ENGINE_METHOD_RAND;
    num = constants.ENGINE_METHOD_ECDH;
    num = constants.ENGINE_METHOD_ECDSA;
    num = constants.ENGINE_METHOD_CIPHERS;
    num = constants.ENGINE_METHOD_DIGESTS;
    num = constants.ENGINE_METHOD_STORE;
    num = constants.ENGINE_METHOD_PKEY_METHS;
    num = constants.ENGINE_METHOD_PKEY_ASN1_METHS;
    num = constants.ENGINE_METHOD_ALL;
    num = constants.ENGINE_METHOD_NONE;
    num = constants.DH_CHECK_P_NOT_SAFE_PRIME;
    num = constants.DH_CHECK_P_NOT_PRIME;
    num = constants.DH_UNABLE_TO_CHECK_GENERATOR;
    num = constants.DH_NOT_SUITABLE_GENERATOR;
    num = constants.NPN_ENABLED;
    num = constants.ALPN_ENABLED;
    num = constants.RSA_PKCS1_PADDING;
    num = constants.RSA_SSLV23_PADDING;
    num = constants.RSA_NO_PADDING;
    num = constants.RSA_PKCS1_OAEP_PADDING;
    num = constants.RSA_X931_PADDING;
    num = constants.RSA_PKCS1_PSS_PADDING;
    num = constants.POINT_CONVERSION_COMPRESSED;
    num = constants.POINT_CONVERSION_UNCOMPRESSED;
    num = constants.POINT_CONVERSION_HYBRID;
    str = constants.defaultCoreCipherList;
    str = constants.defaultCipherList;
}

////////////////////////////////////////////////////
/// v8 tests : https://nodejs.org/api/v8.html
////////////////////////////////////////////////////

{
    const heapStats = v8.getHeapStatistics();
    const heapSpaceStats = v8.getHeapSpaceStatistics();

    const zapsGarbage: number = heapStats.does_zap_garbage;

    v8.setFlagsFromString('--collect_maps');
}

////////////////////////////////////////////////////
/// AsyncHooks tests : https://nodejs.org/api/async_hooks.html
////////////////////////////////////////////////////
{
    const hooks: async_hooks.HookCallbacks = {
        init() {},
        before() {},
        after() {},
        destroy() {},
        promiseResolve() {},
    };

    const asyncHook = async_hooks.createHook(hooks);

    asyncHook.enable().disable().enable();

    const tId: number = async_hooks.triggerAsyncId();
    const eId: number = async_hooks.executionAsyncId();

    class TestResource extends async_hooks.AsyncResource {
        constructor() {
            super('TEST_RESOURCE');
        }
    }

    class AnotherTestResource extends async_hooks.AsyncResource {
        constructor() {
            super('TEST_RESOURCE', 42);
            const aId: number = this.asyncId();
            const tId: number = this.triggerAsyncId();
        }
        run() {
            this.runInAsyncScope(() => {});
            this.runInAsyncScope(Array.prototype.find, [], () => true);
        }
        destroy() {
            this.emitDestroy();
        }
    }

    // check AsyncResource constructor options.
    new async_hooks.AsyncResource('');
    new async_hooks.AsyncResource('', 0);
    new async_hooks.AsyncResource('', {});
    new async_hooks.AsyncResource('', { triggerAsyncId: 0 });
    new async_hooks.AsyncResource('', {
      triggerAsyncId: 0,
      requireManualDestroy: true
    });
}

////////////////////////////////////////////////////
/// zlib tests : http://nodejs.org/api/zlib.html ///
////////////////////////////////////////////////////

{
    {
        const gzipped = zlib.gzipSync('test');
        const unzipped = zlib.gunzipSync(gzipped.toString());
    }

    {
        const deflate = zlib.deflateSync('test');
        const inflate = zlib.inflateSync(deflate.toString());
    }

    {
        const gzip = zlib.createGzip();
        const written: number = gzip.bytesWritten;
    }
}

///////////////////////////////////////////////////////////
/// Inspector Tests                                     ///
///////////////////////////////////////////////////////////

{
    {
        const b: inspector.Console.ConsoleMessage = {source: 'test', text: 'test', level: 'error' };
        inspector.open();
        inspector.open(0);
        inspector.open(0, 'localhost');
        inspector.open(0, 'localhost', true);
        inspector.close();
        const inspectorUrl: string = inspector.url();

        const session = new inspector.Session();
        session.connect();
        session.disconnect();

        // Unknown post method
        session.post('A.b', { key: 'value' }, (err, params) => {});
        // TODO: parameters are implicitly 'any' and need type annotation
        session.post('A.b', (err: Error | null, params?: {}) => {});
        session.post('A.b');
        // Known post method
        const parameter: inspector.Runtime.EvaluateParameterType = { expression: '2 + 2' };
        session.post('Runtime.evaluate', parameter,
            (err: Error | null, params: inspector.Runtime.EvaluateReturnType) => {});
        session.post('Runtime.evaluate', (err: Error, params: inspector.Runtime.EvaluateReturnType) => {
            const exceptionDetails: inspector.Runtime.ExceptionDetails = params.exceptionDetails!;
            const resultClassName: string = params.result.className!;
        });
        session.post('Runtime.evaluate');

        // General event
        session.on('inspectorNotification', message => {
            message; // $ExpectType InspectorNotification<{}>
        });
        // Known events
        session.on('Debugger.paused', (message: inspector.InspectorNotification<inspector.Debugger.PausedEventDataType>) => {
            const method: string = message.method;
            const pauseReason: string = message.params.reason;
        });
        session.on('Debugger.resumed', () => {});
        // Node Inspector events
        session.on('NodeTracing.dataCollected', (message: inspector.InspectorNotification<inspector.NodeTracing.DataCollectedEventDataType>) => {
          const value: Array<{}> = message.params.value;
        });
    }
}

///////////////////////////////////////////////////////////
/// Trace Events Tests                                  ///
///////////////////////////////////////////////////////////

{
    const enabledCategories: string = trace_events.getEnabledCategories();
    const tracing: trace_events.Tracing = trace_events.createTracing({ categories: ['node', 'v8'] });
    const categories: string = tracing.categories;
    const enabled: boolean = tracing.enabled;
    tracing.enable();
    tracing.disable();
}

////////////////////////////////////////////////////
/// module tests : http://nodejs.org/api/modules.html
////////////////////////////////////////////////////
import moduleModule = require('module');

{
    require.extensions[".ts"] = () => "";

    Module.runMain();
    const s: string = Module.wrap("some code");

    const m1: Module = new Module("moduleId");
    const m2: Module = new Module.Module("moduleId");
    const b: string[] = Module.builtinModules;
    let paths: string[] = module.paths;
    paths = m1.paths;

    moduleModule.createRequireFromPath('./test')('test');
}

////////////////////////////////////////////////////
/// Node.js ESNEXT Support
////////////////////////////////////////////////////

{
    const s = 'foo';
    const s1: string = s.trimLeft();
    const s2: string = s.trimRight();
}
