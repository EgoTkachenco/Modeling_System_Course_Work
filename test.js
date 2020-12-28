const {
  System,
  Processor,
  Create,
  LineProcess,
} = require("./lib");

module.exports.simulateSystem = (time) => {
  // CREATOR для повідомлення першого типу
  let CREATE_1 = new Create({
    name: "Прийшло повідомлення 1 типу",
    low: 8,
    high: 2,
    randType: "uniform",
    eventType: "message_1",
  });
  // CREATOR для повідомлення другого типу
  let CREATE_2 = new Create({
    name: "Прийшло повідомлення 2 типу",
    low: 9,
    high: 2,
    randType: "uniform",
    eventType: "message_2",
  });

  // Процессор для обробки повідомлень
  let PROCESSOR = new Processor({
    name: "Процессор",
    low: 1,
    high: 3,
    randType: "uniform",
  });

  // Лінія для повідомлень першого типу
  let LINE_1 = new LineProcess({
    name: "Лінія 1",
    maxQueue: 3,
    delay: 9,
    randType: "exp",
    messageType: "message_1",
  });
  // Лінія для повідомлень другого типу
  let LINE_2 = new LineProcess({
    name: "Лінія 2",
    maxQueue: 3,
    delay: 10,
    randType: "exp",
    messageType: "message_2",
  });

  // Всі повідомлення 1 типу 100% переходять до процессора
  CREATE_1.nextElements = [{ el: PROCESSOR, probability: 1 }];
  // Всі повідомлення 2 типу 100% переходять до процессора
  CREATE_2.nextElements = [{ el: PROCESSOR, probability: 1 }];

  // Повідомлення з процессора переходять до двох ліній передачі повідомлень
  PROCESSOR.nextElements = [
    { el: LINE_1, messageType: "message_1" },
    { el: LINE_2, messageType: "message_2" },
  ];

  // Ініціалізуємо систему
  let SYSTEM = new System({
    d1: 35,
    d2: 45,
    z1: 3,
    z2: 5,
    z1Count: 0,
    z2Count: 0
  });

  // Додаємо елементи до системи
  SYSTEM.elements = [CREATE_1, CREATE_2, PROCESSOR, LINE_1, LINE_2];

  // Додаємо елементам систему
  SYSTEM.elements.forEach((el) => (el.system = SYSTEM));
  return SYSTEM.simulate(time);
};
