export class Environments {
  static get(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
    return value || defaultValue!;
  }

  static getMongoUri(): string {
    return this.get(
      'MONGO_URI',
      'mongodb://root:admin123@localhost:27017/solution?authSource=admin'
    );
  }

  static isProduction(): boolean {
    return this.get('NODE_ENV', 'development') === 'production';
  }

  static getJwtSecret(): string {
    return this.get('JWT_SECRET', '3fdadfd7e3709482276eda04a1aabe39');
  }
}
