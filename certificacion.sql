SELECT DET.FEC_HOJA_RUTA,      
				                              EJE.COD_EJECUTIVO,      
				                              EQ.COD_PERSONAL,      
				                              reg.des_imei,      
				                              DET.NUM_DOC,      
				                              EJE.DES_EJECUTIVO,      
				                              DET.NUM_ITEM,      
				                              DET.NOM_CLI,      
				                              DET.NUM_COORDENADA_X,      
				                              NUM_COORDENADA_Y,
				                              --DET.COD_TIP_ACT,
				                             CASE DET.COD_TIP_ACT WHEN 'MOT_ACT_PROS' THEN (SELECT NUM_LAT_NEG FROM BMOVILPRO.APP_CLI_PROSPECTO where  num_doc_ide = DET.NUM_DOC )                              
				                               ELSE NVL(F_CLI_BUS_DAT_X_TIP_DOC('1', DET.NUM_DOC, '53'), '')   END as NEGOCIO_X,
				                             CASE DET.COD_TIP_ACT WHEN 'MOT_ACT_PROS' THEN (SELECT NUM_LON_NEG FROM BMOVILPRO.APP_CLI_PROSPECTO where  num_doc_ide = DET.NUM_DOC )                              
				                               ELSE NVL(F_CLI_BUS_DAT_X_TIP_DOC('1', DET.NUM_DOC, '54'), '')   END as NEGOCIO_Y,
				                             CASE DET.COD_TIP_ACT WHEN 'MOT_ACT_PROS' THEN (SELECT NUM_LAT_DOM FROM BMOVILPRO.APP_CLI_PROSPECTO where  num_doc_ide = DET.NUM_DOC )                              
				                               ELSE NVL(F_CLI_BUS_DAT_X_TIP_DOC('1', DET.NUM_DOC, '55'), '')   END as Domicilio_x,
				                             CASE DET.COD_TIP_ACT WHEN 'MOT_ACT_PROS' THEN (SELECT NUM_LON_DOM FROM BMOVILPRO.APP_CLI_PROSPECTO where  num_doc_ide = DET.NUM_DOC )                              
				                               ELSE NVL(F_CLI_BUS_DAT_X_TIP_DOC('1', DET.NUM_DOC, '56'), '')   END as Domicilio_y    
				                                
				                         FROM CRE_HOJA_RUTA_DET DET      
				                        inner JOIN CRE_EJECUTIVO_NEG EJE      
				                           ON EJE.COD_EJECUTIVO = DET.COD_EJECUTIVO      
				                        inner JOIN pla_equipo_movil_personal EQ      
				                           ON EQ.Cod_Personal = EJE.COD_PERSONAL      
				                        inner JOIN pla_reg_equipo_movil REG      
				                           ON EQ.COD_EQU_MOVIL = REG.COD_EQU_MOVIL      
				                        WHERE DET.COD_EMPRESA = '0001'      
				                          AND TO_CHAR(DET.FEC_HOJA_RUTA, 'DD/MM/YYYY') = '"+fecha+"' 
				                          AND NUM_DISTANCIA IS NULL"
										AND EQ.TIP_ESTADO = 'ASI' 