const db = require('../db');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create user', async () => {
    expect.assertions(1);
    const user = await db.user.create({
        id: 1,
        firstName: 'Bobbie',
        lastName: 'Draper',
        email: 'bobbie@yahoo.com'
    });
    expect(user.id).toEqual(1);
});

test('get user', async () => {
    expect.assertions(3);
    const user = await db.user.findByPk(1);
    expect(user.firstName).toEqual('Bobbie');
    expect(user.lastName).toEqual('Draper');
    expect(user.email).toEqual('bobbie@yahoo.com');
});

test('delete user', async () => {
    expect.assertions(1);
    await db.user.destroy({
        where: {
            id: 1
        }
    });
    const user = await db.user.findByPk(1);
    expect(user).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
