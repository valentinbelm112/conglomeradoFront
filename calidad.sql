
-- Create table
create table CACTUS_SAFI.CLI_CONSEJO_DIRECT
(
  num_consejo_direct         NUMBER(10),
  des_nombres               VARCHAR2(200),
  des_dni                   VARCHAR2(200),
  des_cargo                 VARCHAR2(200),
  num_edad                  NUMBER(10),
  des_email                 VARCHAR2(200),
  num_telefono              NUMBER(10),
  des_direccion            VARCHAR2(200),
  des_codigo_asociacion     VARCHAR2(200)

)
tablespace CACTUS_SAFI
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_CONSEJO_DIRECT
  is 'tabla  que contiene informacion de la junta directiva del conglomerado.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_consejo_direct
  is 'COLUMNA num_consejo_direct Especifica el identificador único de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_nombres
  is 'COLUMNA des_nombres Especifica los nombres completos y apellidos completos del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_dni
  is 'COLUMNA des_dni Especifica el número de documento de identidad (DNI) del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_cargo
 is 'COLUMNA des_cargo Especifica el cargo o profesión del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_edad
   is 'COLUMNA num_edad Almacena la edad del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_email
  is 'COLUMNA des_email Contiene la dirección de correo electrónico del miembro de la junta.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_telefono
  is 'COLUMNA num_telefono Almacena el numero de teléfono del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_direccion
  is 'COLUMNA des_direccion Especifica la dirección de domicilio del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_codigo_asociacion
  is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion de la junta directiva.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_CONSEJO_DIRECT ADD CONSTRAINT CLI_CONSEJO_DIRECT_PK PRIMARY KEY(num_consejo_direct);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_CONSEJO_DIRECT FOR CACTUS_SAFI.CLI_CONSEJO_DIRECT;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_CONSEJO_DIRECT TO PROSIS_FIN; 