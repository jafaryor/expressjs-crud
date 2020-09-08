import User from '@entities/User';


export interface IUserDao {
    getOne: (id: number) => Promise<User | null>;
    getAll: () => Promise<User[]>;
    add: (user: User) => Promise<void>;
    update: (user: User) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {


    /**
     *
     */
    public async getOne(id: number): Promise<User | null> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<User[]> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async add(user: User): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     */
    public async update(user: User): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default UserDao;
