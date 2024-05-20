import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  const port = 5000;
  try {
    await mongoose.connect(
      'mongodb+srv://fristproject:NNEcr5qcKrpF9WOG@cluster0.zaizzat.mongodb.net/first-project?retryWrites=true&w=majority&appName=Cluster0',
    );

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
