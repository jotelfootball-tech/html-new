const http = require('http');

function postItem() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            title: 'Test Item',
            description: 'This is a test item',
            category: 'electronics',
            type: 'lost',
            location: 'Lagos',
            date: '2023-10-27',
            contactName: 'Tester',
            contactPhone: '08000000000',
            contactEmail: 'test@test.com'
        });

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/items',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    console.log('POST /api/items: SUCCESS');
                    resolve(JSON.parse(body));
                } else {
                    console.error(`POST /api/items: FAILED (${res.statusCode})`);
                    console.error(body);
                    reject(new Error('Post failed'));
                }
            });
        });

        req.on('error', (e) => {
            console.error(`POST /api/items: ERROR (${e.message})`);
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

function getItems() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:3000/api/items', (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const items = JSON.parse(body);
                    if (Array.isArray(items) && items.length > 0) {
                        console.log('GET /api/items: SUCCESS (Items found)');
                        resolve();
                    } else {
                        console.log('GET /api/items: SUCCESS (No items found, but request worked)');
                        resolve();
                    }
                } else {
                    console.error(`GET /api/items: FAILED (${res.statusCode})`);
                    reject(new Error('Get failed'));
                }
            });
        }).on('error', (e) => {
            console.error(`GET /api/items: ERROR (${e.message})`);
            reject(e);
        });
    });
}

async function runTests() {
    try {
        console.log('Starting API Tests...');
        await postItem();
        await getItems();
        console.log('All tests passed!');
    } catch (error) {
        console.error('Tests failed:', error);
        process.exit(1);
    }
}

runTests();
