-- Elimina posibles registros anteriores
DELETE FROM users;
DELETE FROM authorities;
DELETE FROM profesional;

-- Usuario: profesional@example.com / contraseña: 1234
INSERT INTO users (username, password, enabled) VALUES
('profesional@example.com', '$2a$10$KdRY.lkoJr9SkmSP5luLNOje.FvmpYM08Vdbj3SWzjgkQQ1C/6msO', true);

INSERT INTO authorities (username, authority) VALUES
('profesional@example.com', 'ROLE_PROFESIONAL');

-- Perfil asociado en tabla profesional (sin importar el campo password aquí)
INSERT INTO profesional (correo, password, nombre, telefono, puesto, cualidades, fecha_ini, fecha_fin)
VALUES ('profesional@example.com', '$2a$10$KdRY.lkoJr9SkmSP5luLNOje.FvmpYM08Vdbj3SWzjgkQQ1C/6msO', 'Juan González', '666123456', 'Desarrollador Full Stack',
ARRAY['Java', 'Spring', 'React'], '2025-05-01', '2025-5-31');

INSERT INTO EMPRESA (NOMBRE, EMAIL, PASSWORD, SUSCRIPCION) VALUES ('AgyleICT', 'hr@agyleict.com', '$2a$10$KdRY.lkoJr9SkmSP5luLNOje.FvmpYM08Vdbj3SWzjgkQQ1C/6msO', 'Oro');
INSERT INTO USERS (USERNAME, PASSWORD, ENABLED) VALUES ('hr@agyleict.com', '$2a$10$KdRY.lkoJr9SkmSP5luLNOje.FvmpYM08Vdbj3SWzjgkQQ1C/6msO', true); /*1234*/
INSERT INTO authorities(username, authority) values ('hr@agyleict.com', 'ROLE_EMPRESA');

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

INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  102,
  1001,
  'profesional@example.com',
  'SOLICITADA'
);