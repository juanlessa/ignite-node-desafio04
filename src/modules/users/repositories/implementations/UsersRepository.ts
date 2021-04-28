import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private users: User[];

    private static INSTANCE: UsersRepository;

    private constructor() {
        this.users = [];
    }

    public static getInstance(): UsersRepository {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }

        return UsersRepository.INSTANCE;
    }

    create({ name, email }: ICreateUserDTO): User {
        // Complete aqui
        const user = new User();
        Object.assign(user, {
            name,
            email,
            admin: false,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.users.push(user);
        return user;
    }

    findById(id: string): User | undefined {
        // Complete aqui
        const userExistis = this.users.find((user) => user.id === id);

        if (!userExistis) {
            return undefined;
        }
        return userExistis;
    }

    findByEmail(email: string): User | undefined {
        // Complete aqui
        const userExistis = this.users.find((user) => user.email === email);

        if (!userExistis) {
            return undefined;
        }
        return userExistis;
    }

    turnAdmin(receivedUser: User): User {
        // Complete aqui
        const userIndex = this.users.findIndex(
            (user) => user.id === receivedUser.id
        );
        if (userIndex === -1) {
            throw new Error("user not found");
        }

        this.users[userIndex].admin = true;
        return this.users[userIndex];
    }

    list(): User[] {
        return this.users;
    }
}

export { UsersRepository };
