-- CreateEnum
CREATE TYPE "public"."typeUser" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."categoriaCurso" AS ENUM ('ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS', 'CIENCIAS_DA_COMPUTACAO', 'ESPECIALIZACAO_EM_FRONTEND', 'ESPECIALIZACAO_EM_BACKEND', 'ENGENHARIA_DA_COMPUTACAO', 'ENGENHARIA_DE_SOFTWARE', 'ESPECIALIZACAO_EM_CIBERSEGURANCA');

-- CreateEnum
CREATE TYPE "public"."nivelCurso" AS ENUM ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO');

-- CreateEnum
CREATE TYPE "public"."turmaSala" AS ENUM ('Turma_2025_2', 'Turma_2026_1');

-- CreateEnum
CREATE TYPE "public"."turnoSala" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateEnum
CREATE TYPE "public"."Professores" AS ENUM ('Jonas_Fortes', 'Valdiano_Rocha', 'Jose_Lianderson', 'Maira_Stefany', 'Amaral_Neto', 'Felipe_Carneiro', 'Luana_Vitoria', 'Wesley_Monteiro');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "public"."typeUser" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" "public"."categoriaCurso" NOT NULL DEFAULT 'ESPECIALIZACAO_EM_BACKEND',
    "nivel" "public"."nivelCurso" NOT NULL DEFAULT 'INICIANTE',
    "aluno_id" INTEGER,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sala" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "professor" "public"."Professores" NOT NULL DEFAULT 'Jonas_Fortes',
    "turma" "public"."turmaSala" NOT NULL,
    "turno" "public"."turnoSala" NOT NULL DEFAULT 'MANHA',

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nome_key" ON "public"."Curso"("nome");

-- AddForeignKey
ALTER TABLE "public"."Curso" ADD CONSTRAINT "Curso_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
