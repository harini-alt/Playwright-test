export class TestDataFactory {
  static generateValidStudent() {
    return {
      firstName: "John",
      lastName: "Doe",
      email: `john.doe${Date.now()}@example.com`,
      phone: "1234567890"
    };
  }

  static generateInvalidEmailStudent() {
    return {
      firstName: "Jane",
      lastName: "Smith",
      email: "hello1232@gmail.com",
      phone: "1234567890"
    };
  }

  static generateEmptyStudent() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    };
  }
}



