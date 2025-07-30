import { CreationAttributes } from "sequelize";
import { User } from "../../models/user.model";
import { sequelize } from "../config";

const USER_EMAIL: string = process.env.USER_EMAIL || '';
const USER_PASSWORD: string = process.env.USER_PASSWORD || '';

export async function seedUsers(closeConnection: boolean = true) {
    // await sequelize.sync({ force: false });
  
    if (!USER_EMAIL || !USER_PASSWORD) {
      console.error('USER_EMAIL e USER_PASSWORD devem estar definidos no .env');
      return;
    }

    const initialUser: CreationAttributes<User> = {
      email: USER_EMAIL,
      password: USER_PASSWORD,
    };
  

    await User.findOrCreate({
      where: { email: initialUser.email },
      defaults: initialUser
    });
    
    console.log('Usuário inserido/atualizado com sucesso!'); 
    if (closeConnection) {
      await sequelize.close();
    }
  }
