INSERT INTO EMPRESA (NOMBRE, EMAIL, PASSWORD, SUSCRIPCION) VALUES ('AgyleICT', 'hr@agyleict.com', '1234', 'Oro');
INSERT INTO EMPRESA (NOMBRE, EMAIL, PASSWORD, SUSCRIPCION) VALUES ('TechSolutions', 'contact@techsolutions.com', '1234', 'Plata');
INSERT INTO USERS (USERNAME, PASSWORD, ENABLED) VALUES ('hr@agyleict.com', '$2a$10$ZcMv1lxMHRzYgQYAKsnx4uMsEn0TtGrSce4vZ/CiFo1PbiXkXr.4i', true); /*1234*/
insert into authorities(username, authority) values ('hr@agyleict.com', 'ROLE_EMPRESA');
INSERT INTO USERS (USERNAME, PASSWORD, ENABLED) VALUES ('contact@techsolutions.com', '$2a$10$ZcMv1lxMHRzYgQYAKsnx4uMsEn0TtGrSce4vZ/CiFo1PbiXkXr.4i', true); /*1234*/
insert into authorities(username, authority) values ('contact@techsolutions.com', 'ROLE_EMPRESA');


INSERT INTO PROFESIONAL (CORREO, NOMBRE, TELEFONO, PUESTO, CUALIDADES, FECHA_INI, FECHA_FIN) 
VALUES ('profesional@example.com', 'Juan González', '666123456', 'Desarrollador Full Stack', 
ARRAY['Java', 'Spring', 'React'], '2025-01-01', '2025-12-31');
INSERT INTO USERS (USERNAME, PASSWORD, ENABLED) VALUES ('profesional@example.com', '$2a$10$ZcMv1lxMHRzYgQYAKsnx4uMsEn0TtGrSce4vZ/CiFo1PbiXkXr.4i', true); /*1234*/
insert into authorities(username, authority) values ('profesional@example.com', 'ROLE_PROFESIONAL');




INSERT INTO puesto (id, nombre_puesto, descripcion_puesto, cualidades_puesto, fecha_ini, fecha_fin, empresa_email)
VALUES (
  1001,
  'Desarrollador Full Stack',
  'Responsable del desarrollo de APIs REST usando Spring Boot',
  ARRAY['Spring', 'Java', 'React'],
  '2025-01-01',
  '2025-12-31',
  'hr@agyleict.com'
);
INSERT INTO puesto (id, nombre_puesto, descripcion_puesto, cualidades_puesto, fecha_ini, fecha_fin, empresa_email)
VALUES (
  1003,
  'Desarrollador Full Stack',
  'Responsable del desarrollo de APIs REST usando Spring Boot',
  ARRAY['Spring', 'Java', 'React'],
  '2025-01-01',
  '2025-12-31',
  'hr@agyleict.com'
);
INSERT INTO puesto (id, nombre_puesto, descripcion_puesto, cualidades_puesto, fecha_ini, fecha_fin, empresa_email)
VALUES (
  1002,
  'Desarrollador Full Stack',
  'Encargado del desarrollo de aplicaciones web modernas',
  ARRAY['Java', 'Spring', 'React'],
  '2025-01-01',
  '2025-12-31',
  'contact@techsolutions.com'
);

INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  102,
  1002,
  'profesional@example.com',
  'SOLICITADA'
);

INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  101,
  1001,
  'profesional@example.com',
  'SOLICITADA'
);
INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  103,
  1003,
  'profesional@example.com',
  'SOLICITADA'
);