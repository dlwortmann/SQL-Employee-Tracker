INSERT INTO department (name) 
VALUES 
    ("Hospitality"),
    ("Pickleball"),
    ("Server"),
    ("Bar"),
    ("Management");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Assistant General Manager", 70000, 5),
    ("Key Hourly Pickleballer", 40000, 2),
    ("Lead Bartender", 45000, 4),
    ("Busser", 20000, 1),
    ("Cashier", 21000, 1),
    ("Food Runner", 24000, 1),
    ("Event Server", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Bill", " Crystal", 1, 1),
    ("Jill", "Peterson", 2, 4),
    ("Marissa", "Rhodes", 3, 2),
    ("Adam", "Huffman", 4, 3),
    ("Mike", "Rodriguez", 5, 2),
    ("Chris", "Ward", 2, 5);
