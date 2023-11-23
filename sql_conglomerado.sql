create table CRE_CONSEJO_DIRECTIVO
(
  id_consejo_direct         NUMBER(10),
  des_nombres               VARCHAR2(200),
  des_dni                   VARCHAR2(200),
  des_cargo                 VARCHAR2(200),
  num_edad                  NUMBER(10),
  des_email                 VARCHAR2(200),
  num_telefono              NUMBER(10),
  des_direccion            VARCHAR2(200),
  des_codigo_asociacion     VARCHAR2(200),
  des_partida                 VARCHAR2(200),
  des_nombre_asociacion      VARCHAR2(200),
  des_Asiento                VARCHAR2(200)

);


create table CLI_ASIENTO_PROPIETARIO
(
  num_asiento_prop            NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_prop             VARCHAR2(200),
  des_codigo_asoc             VARCHAR2(200),
  des_partida                  VARCHAR2(200),
  des_asiento                 VARCHAR2(200),
  des_nombre_completo         VARCHAR2(200),
  des_dni                     VARCHAR2(200),
  des_estado_civil            NUMBER(10),
  des_dni_conyugue            VARCHAR2(200),
  des_acciones               VARCHAR2(200)

);
delete from CLI_ASIENTO_PROPIETARIO;

drop table CLI_ASIENTO_PROPIETARIO

select *from CLI_ASIENTO_PROPIETARIO;
delete from CRE_CONSEJO_DIRECTIVO
drop table CRE_CONSEJO_DIRECTIVO

select *from CRE_CONSEJO_DIRECTIVO

select *from  cre_consejo_directivo where des_dni='19889663'
create table CRE_DOCUMENTO_DETALLE
(

  num_documento_direct         NUMBER(10),
  des_codigo_asociacion        VARCHAR2(200),
  des_version                  VARCHAR2(200),
  fec_actualizacion            Date,
  fec_documento                Date,
  des_link_documento_inscrito  VARCHAR2(200),
  fec_inicio_vigencia          Date,
  fec_fin_vigencia             Date,
  des_observaciones            VARCHAR2(200),
  des_tipdoc                   VARCHAR2(200)
 
)


create table CLI_DOCUMENTO_PDF
(
  num_documento_pdf            NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_asociacion        VARCHAR2(200),
  fec_actualizacion            Date,
  des_nombre_documento         VARCHAR2(255),
  des_contenido                BLOB,
  tipo_usuario                 VARCHAR2(255)
 
);

delete from CLI_DOCUMENTO_PDF
select * from CLI_DOCUMENTO_PDF;
delete from CLI_DOCUMENTO_PDF
drop table CLI_DOCUMENTO_PDF
delete from CRE_DOCUMENTO_DETALLE

select *from CRE_DOCUMENTO_DETALLE;
select *from CRE_DOCUMENTO_DETALLE;

drop table CRE_DOCUMENTO_DETALLE

SELECT *
FROM ALL_SEQUENCES@prod;

select *from CRE_USUARIO

-- Create table
-- Create table
create table CRE_USUARIO_CGM
(
  id_usuario               NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  cod_usuario               VARCHAR2(200),
  des_usuario               VARCHAR2(200),
  cod_empresa               VARCHAR2(10),
  cod_estado                NUMBER(10),
  fec_registro              Date,
  des_password              VARCHAR2(200),
  des_codigo_asociacion     VARCHAR2(200),
  des_dni                   VARCHAR2(200),
  des_estado_civ            VARCHAR2(200),
  fec_fecha_nac             Date,
  des_domicilio             VARCHAR2(200),
  des_telefono              VARCHAR2(200),
  des_lugar_nac             VARCHAR2(200),
  des_num_cel               VARCHAR2(200),
  des_link_perf             VARCHAR2(200),
  des_sexo                  VARCHAR2(100)                
 
)


select *from CRE_USUARIO_CGM
drop table CRE_USUARIO_CGM;
alter table CRE_USUARIO
  add constraint CRE_USUARIO_PK primary key (cod_usuario);

update CRE_USUARIO_CGM
SET des_link_perf = 'http://localhost:9090/documento/show/imagen25532.png';
WHERE id_usuario = 1;  

select*from CRE_USUARIO_CGM;
update into 
insert into CRE_USUARIO (des_usuario,cod_empresa,cod_estado,fec_registro,des_password,Des_Codigo_Asociacion)
  values ('JDELACRUZR','001',1,sysdate,'','E00241');


insert into CRE_USUARIO_CGM (ID_USUARIO, COD_USUARIO, DES_USUARIO, COD_EMPRESA, COD_ESTADO, FEC_REGISTRO, DES_PASSWORD, DES_CODIGO_ASOCIACION, DES_DNI, DES_ESTADO_CIV, FEC_FECHA_NAC, DES_LUGAR_NAC, DES_DOMICILIO, DES_TELEFONO, DES_LINK_PERF,DES_NUM_CEL,DES_SEXO)
values (1, 'JDELACRUZR', 'JOSE ANTONY DE LA CRUZ ROMANI', '001', 1, to_date('14-09-2023', 'dd-mm-yyyy'), 'contrasenia123', 'E00241', '73848256', 'Soltero', to_date('01-01-1990', 'dd-mm-yyyy'), 'Lima', '123 Calle Principal', '71758723', 'http://localhost:9090/documento/show/imagen25532.png','940472373','Masculino');


drop table CRE_USUARIO;
--Tabla propietarios asiento

  create table CLI_ASIENTO_PROPIETARIO
(   id_asiento_prop             NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
    des_codigo_prop             VARCHAR2(200),
    des_codigo_asoc             VARCHAR2(200),
    des_partida                 VARCHAR2(100),
    des_asiento                 VARCHAR2(100),
    des_nombre_completo         VARCHAR2(200),
    des_dni                     VARCHAR2(200),
    des_estado_civil            VARCHAR2(30),
    des_dni_conyugue            VARCHAR2(200),
    des_acciones                VARCHAR2(100)
)

select*from CLI_ASIENTO_PROPIETARIO;
delete from CLI_ASIENTO_PROPIETARIO;

--Tabla propietarios
  create table CRE_PROPIETARIOS
(   id_propietario               NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
    des_codigo_propietario       VARCHAR2(200),
    des_codigo_Dni               VARCHAR2(200),
    des_estado_civil             VARCHAR2(200),
    des_nombres                  VARCHAR2(200),
    des_dni_conyugue             VARCHAR2(200),
    num_telefono                 NUMBER(30),
    num_acciones_derechos        float,
    des_correo                   VARCHAR2(200),
    des_documento_link           VARCHAR2(200),
    des_codigo_asociacion        VARCHAR2(200),
    des_estado                   VARCHAR2(100),
    des_situacion                VARCHAR2(100),
    des_asiento                  VARCHAR2(100)

)



UPDATE CRE_PROPIETARIOS
SET des_estado = 'Activo'
WHERE des_estado != 'Inactivo';

select *from CRE_PROPIETARIOS WHERE des_estado = '';
select *from CRE_PROPIETARIOS WHERE des_codigo_dni = '74931915';

alter table CRE_PROPIETARIOS
  add constraint CRE_PROPIETARIOS_PK primary key (id_propietario);
  
drop table CRE_PROPIETARIOS
select * from CRE_PROPIETARIOS

SELECT COUNT(*) FROM CRE_PROPIETARIOS WHERE des_codigo_asociacion = 'E00241';

select *from CRE_PROPIETARIOS;

select *from CRE_PROPIETARIOS;

delete from CRE_PROPIETARIOS
alter table CRE_PROPIETARIOS
  add des_estado VARCHAR2(100);

create table CRE_INMUEBLE_PROP
( 
    
  id_inmueble                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  num_partida_registral        VARCHAR2(200),
  des_tipo_dominio             VARCHAR2(200),
  des_direccion                VARCHAR2(200),
  des_oficina_registral        VARCHAR2(200),
  num_acciones_derechos        float,
  des_departamento             VARCHAR2(200),
  des_distrito                 VARCHAR2(200),
  des_provincia                VARCHAR2(200),
  des_codigo_asociacion        VARCHAR2(200),
  fec_registro_sunarp          Date,
  des_comentario              VARCHAR2(200), 
 des_asiento                  VARCHAR2(200),
 des_situacion                  VARCHAR2(200)
)

alter table CRE_INMUEBLE_PROP
  add constraint CRE_INMUEBLE_PROP_PK primary key (id_inmueble);
  
drop table CRE_INMUEBLE_PROP

-- select prop inmueble
select * from CRE_INMUEBLE_PROP
delete from CRE_INMUEBLE_PROP

select * from CRE_PROPIETARIOS where des_codigo_dni='71858727'


select *from  CRE_PROPIETARIOS_INMUEBLE

--delete  prop inmueble
delete from CRE_PROPIETARIOS_INMUEBLE
delete from CRE_PROPIETARIOS
delete from CRE_INMUEBLE_PROP
delete from CRE_PROPIETARIOS_INMUEBLE;
select*from  CRE_PROPIETARIOS where des_nombres='AGUILERA GUTIERREZ TRINIDAD'
select*from  CRE_INMUEBLE_PROP
select*from  CRE_PROPIETARIOS_INMUEBLE where id_propietario='22941'
select*from  CRE_PROPIETARIOS_INMUEBLE where id_propietario='102900'
select*from  CRE_PROPIETARIOS_INMUEBLE where id_propietario='128686' and id_inmueble='110241'
SELECT *
FROM CRE_PROPIETARIOS a
INNER JOIN CRE_PROPIETARIOS_INMUEBLE c ON a.id_propietario = c.id_propietario
INNER JOIN CRE_INMUEBLE_PROP b ON b.id_inmueble = c.id_inmueble where b.des_codigo_asociacion='E00241';

drop table CRE_INMUEBLE_PROP;
drop table CRE_PROPIETARIOS;
drop table CRE_PROPIETARIOS_INMUEBLE;

CREATE TABLE CRE_PROPIETARIOS_INMUEBLE (
    num_acciones_derechos    NUMBER(10, 6),
    des_comentario VARCHAR2(400),         
    des_situacion  VARCHAR2(400),
    fec_registro_sunarp Date,
    id_propietario NUMBER REFERENCES CRE_PROPIETARIOS(id_propietario),
    id_inmueble NUMBER REFERENCES CRE_INMUEBLE_PROP(id_inmueble),
    PRIMARY KEY (id_propietario, id_inmueble)
);

create table CLI_DOCUMENTO_PDF
(
  num_documento_pdf            NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_codigo_asociacion        VARCHAR2(200),
  fec_actualizacion            Date,
  des_nombre_documento         VARCHAR2(255),
  des_contenido                BLOB

 
)



create table CRE_DOCUMENTO_ASIENTO
( 
    
  num_documento_asient                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  des_asiento                          VARCHAR2(200),
  des_codigo_asoiacion                 VARCHAR2(200),
  des_contenido                         BLOB
 
)

drop table CRE_DOCUMENTO_ASIENTO
select*from CRE_DOCUMENTO_ASIENTO

select count(*) from CRE_PROPIETARIOS_INMUEBLE;

delete from CRE_PROPIETARIOS_INMUEBLE;
select*from  CRE_PROPIETARIOS_INMUEBLE;
drop table CRE_PROPIETARIOS_INMUEBLE

select*from  CRE_PROPIETARIOS_INMUEBLE where id_propietario='20813';

select*from  CRE_PROPIETARIO_BAJA_DET;


SELECT DISTINCT p.* FROM CRE_PROPIETARIOS p
JOIN CRE_PROPIETARIOS_INMUEBLE i ON p.id_propietario = i.id_propietario
WHERE i.des_codigo_asociacion = 'E00241';

DROP TABLE  CRE_EXPEDIENTE_PROPIETARIO;
-- Create table
create table CLI_EXPEDIENTE_PROPIETARIO
(
  num_expediente                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  des_nombres                     VARCHAR2(200),
  des_apellido_materno            VARCHAR2(200),
  des_apellido_paterno            VARCHAR2(200),
  des_dni                         VARCHAR2(200),
  des_cargo                       VARCHAR2(200),
  des_edad                        VARCHAR2(200),
  des_genero                      VARCHAR2(200),
  fec_fecha_nacimiento            DATE,
  fec_fecha_expedicion            DATE,
  des_departamento_nacimiento     VARCHAR2(200),
  des_grado_instruccion           VARCHAR2(200),
  des_estado_civil                VARCHAR2(200),
  des_departamento_dom            VARCHAR2(200),
  des_provincia_dom               VARCHAR2(200),
  des_distrito_dom                VARCHAR2(200),
  des_direccion_dom               VARCHAR2(200),
  des_telefono                    VARCHAR2(50),
  des_correo_electronico          VARCHAR2(200),
  des_url_foto                    VARCHAR2(200)


)

delete  from CLI_EXPEDIENTE_PROPIETARIO
select * from CLI_EXPEDIENTE_PROPIETARIO
select *from CLI_EXPEDIENTE_PROPIETARIO where des_dni='46397024';

delete  from CLI_EXPEDIENTE_PROPIETARIO  where des_dni='46397024';


-- Create table
create table CRE_PROPIETARIO_BAJA_DET
(
  id_baja_det                     NUMBER(20) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  des_motivo                      VARCHAR2(200),
  fec_baja                        DATE,
  des_obserbaciones               VARCHAR2(200),
  des_link_documento              VARCHAR2(200),
  id_propietario                  NUMBER(10)
 
)

drop table CRE_PROPIETARIO_BAJA_DET
select *from CRE_PROPIETARIO_BAJA_DET
delete from CRE_PROPIETARIO_BAJA_DET
--select *from CRE_PROPIETARIO_BAJA_DET
                                 
    
-- Create table documento propietario
create table CRE_DOCUMENTO_PROPIETARIO
( 
  num_documento_prop           NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_link_documento           VARCHAR2(200),
  des_dni                      VARCHAR2(200),
  des_codigo_asoc              VARCHAR2(200),
  des_tipo_doc                 VARCHAR2(200),
  fec_timestamp_call           DATE,
  id_propietario               NUMBER(10)
 
)


select *from CRE_DOCUMENTO_PROPIETARIO
delete from CRE_DOCUMENTO_PROPIETARIO

drop table CRE_DOCUMENTO_PROPIETARIO

select *from APP_FOTO_CLI_PROSPECTO where num_doc_ide='71858727'


create table CRE_SOCIO
(   
    id_socio                     NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
    des_codigo_socio             VARCHAR2(200),
    des_nombres_com               VARCHAR2(200),
    des_dni                      VARCHAR2(200),
    des_estado_civil             VARCHAR2(200),
    des_dni_conyugue             VARCHAR2(200),
    num_telefono                 NUMBER(30),
    des_correo                   VARCHAR2(200),
    des_documento_link           VARCHAR2(200),
    des_codigo_asociacion        VARCHAR2(200),
    des_estado                   VARCHAR2(100),
    fec_timestamp                Date
    
);

select *from CRE_ATENCION_CANAL@prod


delete from CRE_SOCIO;
select*from CRE_SOCIO;
alter table CRE_SOCIO
add constraint CRE_SOCIO_PK primary key (id_socio);
drop table CRE_SOCIO;

create table CRE_INMUEBLE_ASOC
( 
    
  id_inmueble                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  num_pabellon                 NUMBER(10),
  num_puesto                   NUMBER(10),
  num_area                     NUMBER(10),
  des_direccion                VARCHAR2(200),
  des_giro                     VARCHAR2(200),
  des_negocio                  VARCHAR2(200),
  des_codigo_asociacion        VARCHAR2(200),
  des_estado                   VARCHAR2(200)
 
)

delete from CRE_INMUEBLE_ASOC;
select *from CRE_INMUEBLE_ASOC;
drop table  CRE_INMUEBLE_ASOC;
alter table CRE_INMUEBLE_ASOC
add constraint CRE_INMUEBLE_ASOC_PK primary key (id_inmueble);


select count(*) from CRE_INMUEBLE_ASOC where  des_estado='Activo'

select  p.des_codigo_asociacion, p.des_nombres from CRE_SOCIO p  join  CRE_INMUEBLE_ASOC i on i.des_codigo_asociacion = 'E00241'

CREATE TABLE CRE_SOCIO_INMUEBLE (
    id_socio NUMBER REFERENCES CRE_SOCIO(id_socio),
    id_inmueble NUMBER REFERENCES CRE_INMUEBLE_ASOC(id_inmueble),
    PRIMARY KEY (id_socio, id_inmueble)
);

select *from CRE_SOCIO_INMUEBLE;
delete from CRE_SOCIO_INMUEBLE;
drop table CRE_SOCIO_INMUEBLE;

-- Create table documento propietario
create table CRE_DOCUMENTO_SOCIO
( 
  num_documento_soc            NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_link_documento           VARCHAR2(200),
  des_dni                      VARCHAR2(200),
  des_codigo_asoc              VARCHAR2(200),
  des_tipo_doc                 VARCHAR2(200),
  fec_timestamp_call           DATE,
  des_obeservaciones           VARCHAR2(200),
  id_socio                     NUMBER(10)
 
)

select *from CRE_DOCUMENTO_SOCIO;
delete from CRE_DOCUMENTO_SOCIO

drop table CRE_DOCUMENTO_SOCIO;

--TABLAS INQUILINO

  create table CRE_INMUEBLE_ASOC
(   id_inquilino                 NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
    des_codigo_inquilino         VARCHAR2(200),
    des_apellidos                VARCHAR2(200),
    des_nombres                  VARCHAR2(200),
    des_dni                      VARCHAR2(200),
    des_estado_civil             VARCHAR2(200),
    des_dni_conyugue             VARCHAR2(200),
    num_telefono                 NUMBER(30),
    des_correo                   VARCHAR2(200),
    des_documento_link           VARCHAR2(200),
    des_codigo_asociacion        VARCHAR2(200),
    des_estado                   VARCHAR2(100),
    fec_timestamp                Date
)

drop table CRE_INQUILINO;
delete from CRE_INQUILINO;
alter table CRE_INQUILINO
add constraint CRE_INQUILINO_PK primary key (id_inquilino);

select  * from CRE_INQUILINO;


create table CRE_INMUEBLE_INQ
( 
    
  id_inmueble                  NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY, 
  num_pabellon                 NUMBER(10),
  num_puesto                   NUMBER(10),
  des_direccion                VARCHAR2(200),
  des_negocio                  VARCHAR2(200),
  des_giro                     VARCHAR2(200),
  des_codigo_asociacion       VARCHAR2(200)
  
)

drop table CRE_INMUEBLE_INQ;

alter table CRE_INMUEBLE_INQ
add constraint CRE_INMUEBLE_INQ_PK primary key (id_inmueble);

delete from CRE_INMUEBLE_INQ;
select *from CRE_INMUEBLE_INQ;

SELECT COUNT(*) FROM  CRE_INQUILINO_INMUEBLE;

CREATE TABLE CRE_iNQUILINO_INMUEBLE (
    id_inquilino  NUMBER REFERENCES CRE_INQUILINO(id_inquilino),
    id_inmueble NUMBER REFERENCES CRE_INMUEBLE_INQ(id_inmueble),
    PRIMARY KEY (id_inquilino, id_inmueble)
);


drop table CRE_iNQUILINO_INMUEBLE;
delete from CRE_iNQUILINO_INMUEBLE;

-- Create table documento inqulino
create table CRE_DOCUMENTO_INQUILINO
( 
  num_documento_inq            NUMBER(10) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  des_link_documento           VARCHAR2(200),
  des_dni                      VARCHAR2(200),
  des_codigo_asoc              VARCHAR2(200),
  des_tipo_doc                 VARCHAR2(200),
  fec_timestamp_call           DATE,
  des_obeservaciones           VARCHAR2(200),
  id_inquilino                 NUMBER(10)
 
)

delete  from CRE_DOCUMENTO_INQUILINO;
select * from CRE_DOCUMENTO_INQUILINO;



select *from APP_BALANCE_GENERAL;

select*from CRE_INF_SOCIO_ECONOMICA where cod_pro_cre ='0' and cod_usuario='RRAMIREZ';







