const database = {
    _data: [
        {
            id: 0,
            firstName: 'Hendrik',
            lastName: 'van Dam',
            street: 'Example Street 1',
            city: 'Example City',
            isActive: true,
            emailAddress: 'hvd@server.nl',
            password: 'password123',
            phoneNumber: '1234567890'
        },
        {
            id: 1,
            firstName: 'Marieke',
            lastName: 'Jansen',
            street: 'Example Street 2',
            city: 'Example City',
            isActive: false,
            emailAddress: 'm@server.nl',
            password: 'password123',
            phoneNumber: '0987654321'
        }
    ],
    _index: 2,
    _delayTime: 500,

    getAll(callback) {
        setTimeout(() => {
            console.log('Database Data:', this._data);  // Logging to check data integrity
            callback(null, this._data);
        }, this._delayTime);
    },
    

    getById(id, callback) {
        setTimeout(() => {
            const user = this._data.find(u => u.id === id);
            if (!user) {
                callback({ message: `Error: id ${id} does not exist!` }, null);
            } else {
                callback(null, user);
            }
        }, this._delayTime);
    },

    add(item, callback) {
        setTimeout(() => {
            const exists = this._data.some(u => u.emailAddress === item.emailAddress);
            if (exists) {
                callback({ message: "Error: Email address already exists!" }, null);
            } else {
                item.id = this._index++;
                this._data.push(item);
                callback(null, item);
            }
        }, this._delayTime);
    },

    updateById(id, newData, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(user => user.id === id);
            if (index === -1) {
                callback({ message: `Error: User with id ${id} not found!` }, null);
            } else {
                this._data[index] = { ...this._data[index], ...newData };
                callback(null, this._data[index]);
            }
        }, this._delayTime);
    },

    deleteById(id, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(user => user.id === id);
            if (index === -1) {
                callback({ message: `Error: User with id ${id} not found!` }, null);
            } else {
                this._data.splice(index, 1);
                callback(null, { message: `User with id ${id} deleted successfully.` });
            }
        }, this._delayTime);
    }
};

module.exports = database;
