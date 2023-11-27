CREATE SEQUENCE CACTUS_SAFI.SEC_CLI_WEB_EXTERNO
  MINVALUE 1
  MAXVALUE 9999999999
  START WITH 1
  INCREMENT BY 1
  CYCLE; -- Esta opci�n reinicia la secuencia cuando alcanza el valor m�ximo

SELECT * FROM ALL_SEQUENCES WHERE SEQUENCE_NAME='SEC_CLI_WEB_EXTERNO';


CREATE USER webuser IDENTIFIED BY secret2;

GRANT CONNECT, RESOURCE TO webuser;


select* from CLI_CONSEJO_DIRECT;

-- Create table CLI_CONSEJO_DIRECT
create table CACTUS_SAFI.CLI_CONSEJO_DIRECT
(
  num_consejo_direct        NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_nombres               VARCHAR2(200),
  des_dni                   VARCHAR2(15),
  des_cargo                 VARCHAR2(200),
  num_edad                  NUMBER(10),
  des_email                 VARCHAR2(200),
  num_telefono              NUMBER(10),
  des_direccion             VARCHAR2(200),
  des_codigo_asociacion     VARCHAR2(50),
  des_partida               VARCHAR2(50),
  des_nombre_asociacion     VARCHAR2(200),
  des_asiento               VARCHAR2(50),
  fec_registro              DATE

)

--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_CONSEJO_DIRECT
  is 'tabla  que contiene informacion de la junta directiva del conglomerado.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_consejo_direct
  is 'COLUMNA num_consejo_direct Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_nombres
  is 'COLUMNA des_nombres Especifica los nombres completos y apellidos completos del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_dni
  is 'COLUMNA des_dni Especifica el n�mero de documento de identidad (DNI) del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_cargo
 is 'COLUMNA des_cargo Especifica el cargo o profesi�n del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_edad
   is 'COLUMNA num_edad Almacena la edad del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_email
  is 'COLUMNA des_email Contiene la direcci�n de correo electr�nico del miembro de la junta.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.num_telefono
  is 'COLUMNA num_telefono Almacena el numero de tel�fono del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_direccion
  is 'COLUMNA des_direccion Especifica la direcci�n de domicilio del miembro de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_codigo_asociacion
  is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion de la junta directiva.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_partida
  is 'COLUMNA des_partida Especifica la partida registral de la asociaci�n.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_nombre_asociacion
  is 'COLUMNA des_nombre_asociacion contiene el nombre de la asociacion de un conglomerado.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.des_Asiento
  is 'COLUMNA des_Asiento contiene el codigo del asiento de los directivos.';
comment on column CACTUS_SAFI.CLI_CONSEJO_DIRECT.fec_registro
  is 'COLUMNA fec_registro contiene la fecha en la que se realizo el registro.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_CONSEJO_DIRECT ADD CONSTRAINT CLI_CONSEJO_DIRECT_PK PRIMARY KEY(num_consejo_direct);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_CONSEJO_DIRECT FOR CACTUS_SAFI.CLI_CONSEJO_DIRECT;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_CONSEJO_DIRECT TO webuser; 

-- Fin  Create table CLI_CONSEJO_DIRECT

drop table CLI_ASIENTO_PROPIETARIO;

select *from CLI_DOCUMENTO_PDF;
-- Create table CLI_ASIENTO_PROPIETARIO
create table CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO
(
  num_asiento_prop                NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_prop                 VARCHAR2(200),
  des_codigo_asociacion           VARCHAR2(50),
  des_partida                     VARCHAR2(200),
  des_asiento                     VARCHAR2(200),
  des_nombre_completo             VARCHAR2(200),
  des_dni_prop                    VARCHAR2(15),
  des_estado_civil                VARCHAR2(200),
  des_dni_conyugue                VARCHAR2(200),
  des_acciones                    VARCHAR2(200),
  
  fec_registro                    DATE

)

--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO
  is 'tabla  que contiene informacion de los co-propietarios con su titular.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.num_asiento_prop
  is 'COLUMNA num_asiento_prop Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_codigo_prop
  is 'COLUMNA des_codigo_prop Especifica el codigo del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_codigo_asociacion
  is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_partida
 is 'COLUMNA des_partida Especifica la partida registral de la propiedad.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_asiento
   is 'COLUMNA des_asiento contiene el codigo del asiento del propietario uqe pertenece a una partida R.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_nombre_completo
  is 'COLUMNA des_nombre_completo Contiene el nombre y apellido completo del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_dni_prop
  is 'COLUMNA des_dni_prop Almacena el numero del documento de indentidad del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_estado_civil
  is 'COLUMNA des_estado_civil Especifica el estado civil del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_dni_conyugue
  is 'COLUMNA des_dni_conyugue Especifica el numero del documento de indentidad del conyugue del propietario.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.des_acciones
  is 'COLUMNA des_acciones Especifica el porcentaje de acciones que posee el titular.';
comment on column CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO.fec_registro
  is 'COLUMNA fec_registro contiene la fecha en la que se realizo el registro.';

--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO ADD CONSTRAINT CLI_ASIENTO_PROPIETARIO_PK PRIMARY KEY(num_asiento_prop);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_ASIENTO_PROPIETARIO FOR CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_ASIENTO_PROPIETARIO TO webuser; 

<<<<<<< HEAD
SELECT *FROM CLI_DOCUMENTO_DIRECT;
drop table CLI_DOCUMENTO_DIRECT;

=======
select*from CLI_DOCUMENTO_DIRECT;
>>>>>>> 6049567f9185af220ad9e65ee6e503d1c153a546
-- Create table CLI_DOCUMENTO_CONSEJO ----
create table CACTUS_SAFI.CLI_DOCUMENTO_DIRECT
(
  num_documento_direct                NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_asociacion               VARCHAR2(50),
  des_version                         VARCHAR2(50),
  fec_actualizacion                   DATE,
  fec_documento                       DATE,
  des_link_documento                  VARCHAR2(200),
  fec_inicio_vigencia                 DATE,
  fec_fin_vigencia                    DATE,
  des_observaciones                   VARCHAR2(200),
  des_tip_doc                         VARCHAR2(50)
                     

)
<<<<<<< HEAD
=======

>>>>>>> 6049567f9185af220ad9e65ee6e503d1c153a546

--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_DOCUMENTO_DIRECT
  is 'tabla  que contiene informacion de los documentos legales del consejo directivo.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.num_documento_direct
  is 'COLUMNA num_documento_direct Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.des_codigo_asociacion
  is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion al que pertenece el documento.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.des_version
  is 'COLUMNA des_version Describe la version de los documentos subidos.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.fec_actualizacion
 is 'COLUMNA fec_actualizacion Especifica la fecha en que se hizo la actualizacion del documento.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.fec_documento
 is 'COLUMNA fec_documento contiene la fecha del documento en que se hizo el registro.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.des_link_documento
 is 'COLUMNA  des_link_documento Especifica la ruta en el servidor de la imagen cargada.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.fec_inicio_vigencia
 is 'COLUMNA fec_inicio_vigencia Describe la fecha de la vigencia del documento registrado.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.fec_fin_vigencia
 is 'COLUMNA fec_fin_vigencia Describe la fecha fin de la vigencia del documento registrado.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.des_observaciones
 is 'COLUMNA des_observaciones Especifica la observaciones adicionales del documento.';
comment on column CACTUS_SAFI.CLI_DOCUMENTO_DIRECT.des_tip_doc
  is 'COLUMNA des_tip_doc Especifica el tipo de documento.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_DOCUMENTO_DIRECT ADD CONSTRAINT CLI_DOCUMENTO_DIRECT_PK PRIMARY KEY(num_documento_direct);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_DOCUMENTO_DIRECT FOR CACTUS_SAFI.CLI_DOCUMENTO_DIRECT;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_DOCUMENTO_DIRECT TO webuser; 


drop table CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT;
select *from CLI_DOCUMENTOPDF_DIRECT;
--Create table CLI_DOCUMENTO_PDF ----
create table CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT
(
  num_documentopdf_direct                   NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_asociacion               VARCHAR2(50),
  fec_actualizacion                   DATE,
  des_nombre_documento                VARCHAR2(200),
  des_contenido                       BLOB,
  tip_usuario                         VARCHAR2(25)
                    
)


--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT
  is 'tabla  que contiene informacion de los documentos en formato pdf de los directivos  y propietarios.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.num_documento_pdf
  is 'COLUMNA num_documento_pdf Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.des_codigo_asociacion
  is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion al que pertenece el documento.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.fec_actualizacion
  is 'COLUMNA fec_actualizacion Describe la fecha en que se realiz� el registro del documento.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.des_nombre_documento
 is 'COLUMNA des_nombre_documento Especifica el nombre del documento pdf.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.des_contenido
 is 'COLUMNA  des_contenido contiene el contenido en codigo binario del pdf cargado.';
comment on column CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT.tip_usuario
 is 'COLUMNA tip_usuario Describe el tipo de usuario si es directivo o propietario.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT ADD CONSTRAINT CLI_DOCUMENTOPDF_DIRECT_PK PRIMARY KEY(num_documentopdf_direct);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_DOCUMENTOPDF_DIRECT FOR CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_DOCUMENTOPDF_DIRECT TO webuser; 


SELECT *FROM CLI_USUARIO_CGM;
--Create table CLI_USUARIO_CGM ----
create table CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO
(
  num_usuario                         NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  cod_usuario                         VARCHAR2(50),
  des_usuario                         VARCHAR2(50),
  cod_empresa                         VARCHAR2(50),
  num_estado                          NUMBER(10),
  fec_registro                        DATE,
  des_password                        VARCHAR2(50),
  des_codigo_asociacion               VARCHAR2(50),
  des_dni                             VARCHAR2(15),
  des_estado_civil                    VARCHAR2(50),
  fec_nacimiento                      DATE,
  des_domicilio                       VARCHAR2(100),
  des_telefono                        VARCHAR2(15),
  des_lugar_nacimiento                VARCHAR2(100),
  des_celular                         VARCHAR2(50),
  des_link_perfil                     VARCHAR2(100),
  des_sexo                            VARCHAR2(15)   
                    
)

--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO
  is 'tabla  que contiene informacion los usuarios que van acceder a la pag web conglomerados';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.num_usuario
  is 'COLUMNA num_documento_pdf Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.cod_usuario
  is 'COLUMNA cod_usuario Especifica el codigo drl usuario.';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_usuario
  is 'COLUMNA des_usuario especifica el nombre del usuario.';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.cod_empresa
 is 'COLUMNA cod_empresa Especifica el codigo de empresa.';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.num_estado
 is 'COLUMNA  num_estado describe si el usuario esta activo 1 0 inactivo.';
comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.fec_registro
 is 'COLUMNA fec_registro Describe la fecha del registro del usuario .';
 comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_password
 is 'COLUMNA des_password Describe la contrase�a del usuario .';
 comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_codigo_asociacion
 is 'COLUMNA des_codigo_asociacion Especifica el codigo de asociacion al que pertenece el usuario.';
  comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_dni
 is 'COLUMNA des_dni Especifica el numero del documento de identidad del usuario.';
   comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_estado_civil
 is 'COLUMNA des_dni Especifica el estado civil del usuario.';
    comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.fec_nacimiento
 is 'COLUMNA fec_nacimiento Especifica la fecha de nacimiento del usuario.';
     comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_domicilio
 is 'COLUMNA des_domicilio Especifica la direccion del domicilio del usuario.';
      comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_telefono
 is 'COLUMNA des_telefono Especifica  el numero de telefono del usuario.';
       comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_lugar_nacimiento
 is 'COLUMNA des_lugar_nacimiento describe el lugar de nacimiento del usuario.';
   comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_celular
 is 'COLUMNA des_celular describe el numero de celular del usuario.';
 comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_link_perfil
 is 'COLUMNA des_link_perfil describe el link del perfil de la foto del usuario.';
  comment on column CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO.des_sexo
 is 'COLUMNA des_sexo describe el sexo femenino o masculino del usuario.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO ADD CONSTRAINT CLI_USUARIO_CONGLOMERADO_PK PRIMARY KEY(num_usuario);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_USUARIO_CONGLOMERADO FOR CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_USUARIO_CONGLOMERADO TO PROSIS_FIN; 

DROP TABLE CACTUS_SAFI.CRE_CONGLOMERADO_PROP
--Create table CLI_USUARIO_CGM ----
select *from CLI_CONGLOMERADO_PROP;
create table CACTUS_SAFI.CLI_CONGLOMERADO_PROP
(
  num_propietario                     NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_propietario              VARCHAR2(50),
  des_codigo_dni                      VARCHAR2(50),
  des_estado_civil                    VARCHAR2(50),
  des_nombres                         VARCHAR2(200),
  des_dni_conyugue                    VARCHAR2(200),
  num_telefono                        NUMBER(10),
  des_correo                          VARCHAR2(50),
  des_documento_link                  VARCHAR2(100),
  des_codigo_asociacion               VARCHAR2(50),
  des_estado                          VARCHAR2(30),
  des_asiento                         VARCHAR2(50) ,
  fec_registro                        DATE              
)



--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_CONGLOMERADO_PROP
  is 'tabla  que contiene informacion de los propietarios';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.num_propietario
  is 'COLUMNA num_propietario Especifica el identificador �nico de cada registro en la tabla.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_codigo_propietario
  is 'COLUMNA des_codigo_propietario Especifica el c�digo del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_codigo_dni
  is 'COLUMNA des_codigo_dni Especifica el DNI del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_estado_civil
 is 'COLUMNA des_estado_civil Especifica el estado civil del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_nombres
 is 'COLUMNA des_nombres Especifica los nombres del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_dni_conyugue
 is 'COLUMNA des_dni_conyugue Especifica el DNI del c�nyuge del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.num_telefono
 is 'COLUMNA num_telefono Especifica el n�mero de tel�fono del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.num_acciones_derechos
 is 'COLUMNA num_acciones_derechos Especifica el n�mero de acciones o derechos del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_correo
 is 'COLUMNA des_correo Especifica la direcci�n de correo electr�nico del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_documento_link
 is 'COLUMNA des_documento_link Especifica el enlace al documento del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_codigo_asociacion
 is 'COLUMNA des_codigo_asociacion Especifica el c�digo de la asociaci�n a la que pertenece el propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_estado
 is 'COLUMNA des_estado Especifica el estado del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.des_asiento
 is 'COLUMNA des_asiento Especifica el asiento del propietario.';
comment on column CACTUS_SAFI.CLI_CONGLOMERADO_PROP.fec_registro
 is 'COLUMNA fec_registro Especifica la fecha de registro del propietario.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_CONGLOMERADO_PROP ADD CONSTRAINT CLI_CONGLOMERADO_PROP_PK PRIMARY KEY(num_propietario);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_CONGLOMERADO_PROP FOR CACTUS_SAFI.CLI_CONGLOMERADO_PROP;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_CONGLOMERADO_PROP TO webuser; 


--Create table CLI_USUARIO_CGM ----
create table CACTUS_SAFI.CLI_INMUEBLE_PROP
(
  num_inmueble_prop                        NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_partida_registral               VARCHAR2(50),
  des_tipo_dominio                    VARCHAR2(50),
  des_direccion                       VARCHAR2(200),
  des_oficina_registral               VARCHAR2(50),
  num_acciones_derechos               NUMBER(15,6),
  des_departamento                    VARCHAR2(50),
  des_distrito                        VARCHAR2(50),
  des_provincia                       VARCHAR2(50),
  des_codigo_asociacion              VARCHAR2(30),
  fec_registro_sunarp                 DATE,      
  des_comentario                      VARCHAR2(400) ,
  des_asiento                        VARCHAR2(30) ,
   des_situacion                      VARCHAR2(400) ,
   fec_registro                        DATE                  
)

--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_INMUEBLE_PROP
  is 'Tabla que contiene informaci�n sobre los inmuebles de los propietarios.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.num_inmueble_prop
  is 'COLUMNA num_inmueble N�mero de identificaci�n �nico asignado autom�ticamente a cada inmueble. Este es el identificador principal de la tabla.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_partida_registral
  is 'COLUMNA des_partida_registral N�mero de partida registral del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_tipo_dominio
  is 'COLUMNA des_tipo_dominio Tipo de dominio del inmueble, como propiedad, posesi�n, etc.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_direccion
 is 'COLUMNA des_direccion Direcci�n f�sica del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_oficina_registral
 is 'COLUMNA des_oficina_registral Oficina registral del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.num_acciones_derechos
 is 'COLUMNA num_acciones_derechos N�mero de acciones o derechos asociados al inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_departamento
 is 'COLUMNA des_departamento Departamento donde se ubica el inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_distrito
 is 'COLUMNA des_distrito Distrito donde se ubica el inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_provincia
 is 'COLUMNA des_provincia Provincia donde se ubica el inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_codigo_asociacion
 is 'COLUMNA des_codigo_asociacion C�digo de asociaci�n al que est� vinculado el inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.fec_registro_sunarp
 is 'COLUMNA fec_registro_sunarp Fecha de registro en SUNARP del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_comentario
 is 'COLUMNA des_comentario Comentario o descripci�n adicional del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_asiento
 is 'COLUMNA des_asiento C�digo de asiento del inmueble.';

comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.des_situacion
 is 'COLUMNA des_situacion Situaci�n de posesion del inmueble.';
comment on column CACTUS_SAFI.CLI_INMUEBLE_PROP.fec_registro
 is 'COLUMNA fec_registro Fecha de registro del inmueble en la base de datos.';


--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_INMUEBLE_PROP ADD CONSTRAINT CLI_INMUEBLE_PROP_PK PRIMARY KEY(num_inmueble_prop);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_INMUEBLE_PROP FOR CACTUS_SAFI.CLI_INMUEBLE_PROP;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_INMUEBLE_PROP TO webuser;

select *from CLI_PROPIETARIO_INMUEBLE;

--Create table CLI_USUARIO_CGM ----
create table CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE
(
  num_propietario_inmueble                        NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_partida_registral               VARCHAR2(50),
  num_acciones_derechos               NUMBER(10, 6),
  des_comentario                      VARCHAR2(400),
  des_situacion                       VARCHAR2(50),
  fec_registro_sunarp                 DATE,
  num_propietario NUMBER REFERENCES CLI_CONGLOMERADO_PROP(num_propietario),
    num_inmueble_prop NUMBER REFERENCES CLI_INMUEBLE_PROP(num_inmueble_prop),
    PRIMARY KEY (num_propietario, num_inmueble_prop)
                    
);


--DESCRIPCION DE LA TABLA
comment on table CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE
  is 'Tabla que contiene informaci�n sobre el detalle del inmuebles de los propietarios.';
  
comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.num_propietario_inmueble
  is 'COLUMNA num_inmueble N�mero de identificaci�n �nico asignado autom�ticamente a cada inmueble. Este es el identificador principal de la tabla.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.des_partida_registral
  is 'COLUMNA des_partida_registral N�mero de partida registral del inmueble.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.num_acciones_derechos
 is 'COLUMNA num_acciones_derechos N�mero de acciones o derechos asociados al inmueble.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.des_comentario
 is 'COLUMNA des_comentario Comentario o descripci�n adicional del inmueble.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.des_situacion
 is 'COLUMNA des_situacion Situaci�n actual del inmueble.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.fec_registro_sunarp
 is 'COLUMNA fec_registro_sunarp Fecha de registro en SUNARP del inmueble.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.num_propietario
 is 'COLUMNA num_propietario N�mero de identificaci�n del propietario asociado a la relaci�n. Esta columna hace referencia al campo num_propietario de la tabla CRE_PROPIETARIOS.';

comment on column CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE.num_inmueble_prop
 is 'COLUMNA num_inmueble_prop N�mero de identificaci�n del inmueble asociado a la relaci�n. Esta columna hace referencia al campo num_inmueble_prop de la tabla CRE_INMUEBLE_PROP.';

--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE ADD CONSTRAINT CLI_PROPIETARIO_INMUEBLE_PK PRIMARY KEY(num_propietario_inmueble);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_PROPIETARIO_INMUEBLE FOR CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_PROPIETARIO_INMUEBLE TO webuser;

select *from CLI_EXPEDIENTE_PROP;

DROP TABLE CLI_EXPEDIENTE_PROP;
-- Create table CLI_EXPEDIENTE_PROPIETARIO
create table CACTUS_SAFI.CLI_EXPEDIENTE_PROP
(
  num_expediente_prop                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  des_nombres                     VARCHAR2(200),
  des_apellido_materno            VARCHAR2(200),
  des_apellido_paterno            VARCHAR2(200),
  des_dni                         VARCHAR2(200),
  des_cargo                       VARCHAR2(200),
  des_edad                        VARCHAR2(200),
  des_genero                      VARCHAR2(200),
  fec_nacimiento            DATE,
  fec_expedicion            DATE,
  des_departamento_nac            VARCHAR2(200),
  des_grado_instruccion           VARCHAR2(200),
  des_estado_civil                VARCHAR2(200),
  des_departamento_dom            VARCHAR2(200),
  des_provincia_dom               VARCHAR2(200),
  des_distrito_dom                VARCHAR2(200),
  des_direccion_dom               VARCHAR2(200),
  des_telefono                    VARCHAR2(50),
  des_correo_electronico          VARCHAR2(200),
  des_url_foto                    VARCHAR2(200),
  fec_registro                    DATE


)

comment on table CACTUS_SAFI.CLI_EXPEDIENTE_PROP
  is 'Tabla que contiene informaci�n sobre el expediente de los propietarios.';
  
comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.num_expediente_prop
  is 'COLUMNA num_inmueble N�mero de identificaci�n �nico asignado autom�ticamente a cada expediente. Este es el identificador principal de la tabla.';
  
comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_nombres
  is 'COLUMNA des_nombres Nombres del propietario en el expediente.';
  
comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_apellido_materno
  is 'COLUMNA des_apellido_materno Apellido materno del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_apellido_paterno
  is 'COLUMNA des_apellido_paterno Apellido paterno del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_dni
  is 'COLUMNA des_dni N�mero de documento de identidad (DNI) del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_cargo
  is 'COLUMNA des_cargo Cargo del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_edad
  is 'COLUMNA des_edad Edad del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_genero
  is 'COLUMNA des_genero G�nero del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.fec_fecha_nacimiento
  is 'COLUMNA fec_fecha_nacimiento Fecha de nacimiento del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.fec_fecha_expedicion
  is 'COLUMNA fec_fecha_expedicion Fecha de expedici�n del expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_departamento_nac
  is 'COLUMNA des_departamento_nac Departamento de nacimiento del propietario.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_grado_instruccion
  is 'COLUMNA des_grado_instruccion Grado de instrucci�n del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_estado_civil
  is 'COLUMNA des_estado_civil Estado civil del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_departamento_dom
  is 'COLUMNA des_departamento_dom Departamento de domicilio del propietario.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_provincia_dom
  is 'COLUMNA des_provincia_dom Provincia de domicilio del propietario.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_distrito_dom
  is 'COLUMNA des_distrito_dom Distrito de domicilio del propietario.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_direccion_dom
  is 'COLUMNA des_direccion_dom Direcci�n de domicilio del propietario.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_telefono
  is 'COLUMNA des_telefono N�mero de tel�fono del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_correo_electronico
  is 'COLUMNA des_correo_electronico Correo electr�nico del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.des_url_foto
  is 'COLUMNA des_url_foto URL de la foto del propietario en el expediente.';

comment on column CACTUS_SAFI.CLI_EXPEDIENTE_PROP.fec_registro
  is 'COLUMNA fec_registro Fecha de registro del expediente en la base de datos.';

--CREACION DE PRIMARY KEY
ALTER TABLE CACTUS_SAFI.CLI_EXPEDIENTE_PROP ADD CONSTRAINT CLI_EXPEDIENTE_PROP_PK PRIMARY KEY(num_expediente_prop);

--PERMISOS SYNONYM Y GRANT 
CREATE OR REPLACE PUBLIC SYNONYM CLI_EXPEDIENTE_PROP FOR CACTUS_SAFI.CLI_EXPEDIENTE_PROP;

GRANT SELECT,INSERT,UPDATE,DELETE ON CACTUS_SAFI.CLI_EXPEDIENTE_PROP TO webuser;

