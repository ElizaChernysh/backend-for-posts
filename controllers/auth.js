import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(404).json({
        message: 'Даний username вже використовується.'
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash
    })

    const token = jwt.sign({
      id: newUser._id,
    }, 
    process.env.JWT_SECRET,
    { expiresIn: '60d'}
    );

    await newUser.save();

    res.json({
      newUser, 
      token,
      message: 'Регістрація пройшла успішно.'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при створенні користувача'
    })
  }
}

//Login
export const login = async (req, res) => {
  try {

    const {username, password} = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: 'Такого користувача не існує.'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: 'Неправильний пароль.'
      })
    }

    const token = jwt.sign({
      id: user._id,
    }, 
    process.env.JWT_SECRET,
    { expiresIn: '60d'}
    );

    res.json({
      token, 
      user, 
      message: 'Ви увійшли в систему.'
    })

  } catch (error) {
    res.status(500).json({
      message: 'Помилка при авторизації.'
    })
  }
}

//Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Такого користувача не існує.'
      })
    };
    

    const token = jwt.sign({
      id: user._id,
    }, 
    process.env.JWT_SECRET,
    { expiresIn: '60d'}
    );

    res.json({
      token, 
      user, 
    })

  } catch (error) {
    res.status(500).json({
      message: 'Немає доступу.'
    })
  }
}