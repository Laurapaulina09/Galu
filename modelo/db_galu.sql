-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_galu
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_galu
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_galu` DEFAULT CHARACTER SET utf8 ;
USE `db_galu` ;

-- -----------------------------------------------------
-- Table `db_galu`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`rol` (
  `idrol` INT NULL AUTO_INCREMENT,
  `rol` VARCHAR(20) NULL,
  PRIMARY KEY (`idrol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_galu`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`usuarios` (
  `cedula` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(50) NOT NULL,
  `contraseña` VARCHAR(20) NOT NULL,
  `telefono` INT NULL,
  `celular` INT NULL,
  `avatar` VARCHAR(100) NULL,
  `descripcion` VARCHAR(200) NULL,
  `rol_idrol` INT NOT NULL,
  PRIMARY KEY (`cedula`),
  CONSTRAINT `fk_usuarios_rol`
    FOREIGN KEY (`rol_idrol`)
    REFERENCES `db_galu`.`rol` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_galu`.`trab_realizado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`trab_realizado` (
  `idtrab_realizado` INT NULL AUTO_INCREMENT,
  `foto` VARCHAR(100) NULL,
  `descripcion` VARCHAR(200) NULL,
  `usuarios_cedula` INT NOT NULL,
  PRIMARY KEY (`idtrab_realizado`),
  CONSTRAINT `fk_trab_realizado_usuarios1`
    FOREIGN KEY (`usuarios_cedula`)
    REFERENCES `db_galu`.`usuarios` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_galu`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`Categorias` (
  `idCategorias` INT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(45) NULL,
  `icono` VARCHAR(100) NULL,
  `descripcion` VARCHAR(50) NULL,
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_galu`.`experiencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`experiencia` (
  `idexperiencia` INT NULL AUTO_INCREMENT,
  `usuarios_cedula` INT NOT NULL,
  `Categorias_idCategorias` INT NOT NULL,
  PRIMARY KEY (`idexperiencia`),
  CONSTRAINT `fk_experiencia_usuarios1`
    FOREIGN KEY (`usuarios_cedula`)
    REFERENCES `db_galu`.`usuarios` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experiencia_Categorias1`
    FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `db_galu`.`Categorias` (`idCategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_galu`.`calificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_galu`.`calificacion` (
  `idcalificacion` INT NULL AUTO_INCREMENT,
  `puntos` INT NOT NULL,
  `comentario` VARCHAR(100) NULL,
  `cc_cliente` INT NOT NULL,
  `cc_profesional` INT NOT NULL,
  PRIMARY KEY (`idcalificacion`),
  CONSTRAINT `fk_calificacion_usuarios1`
    FOREIGN KEY (`cc_cliente`)
    REFERENCES `db_galu`.`usuarios` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calificacion_usuarios2`
    FOREIGN KEY (`cc_profesional`)
    REFERENCES `db_galu`.`usuarios` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;