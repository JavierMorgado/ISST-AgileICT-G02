INSERT INTO EMPRESA (NOMBRE, EMAIL, PASSWORD, SUSCRIPCION) VALUES ('AgyleICT', 'hr@agyleict.com', '1234', 'Oro');

INSERT INTO PROFESIONAL (CORREO, PASSWORD, NOMBRE, TELEFONO, PUESTO, CUALIDADES, FECHA_INI, FECHA_FIN) 
VALUES ('profesional@example.com', '123456', 'Juan González', '666123456', 'Desarrollador Full Stack', 
ARRAY['Java', 'Spring', 'React'], '2025-01-01', '2025-12-31');

INSERT INTO puesto (id, nombre_puesto, descripcion_puesto, cualidades_puesto, fecha_ini, fecha_fin, empresa_nombre)
VALUES (
  1001,
  'Desarrollador Full Stack',
  'Responsable del desarrollo de APIs REST usando Spring Boot',
  ARRAY['Spring', 'Java', 'React'],
  '2025-01-01',
  '2025-12-31',
  'AgyleICT'
);

INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  1001,
  1001,
  'profesional@example.com',
  'SOLICITADA'
);

INSERT INTO oferta (id, puesto_id, profesional_correo, estado)
VALUES (
  1002,
  1001,
  'profesional@example.com',
  'ACEPTADA'
);