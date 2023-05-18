/*
  Warnings:

  - Added the required column `githubid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL
);
INSERT INTO "new_User" ("avatarUrl", "id", "login", "name") SELECT "avatarUrl", "id", "login", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_githubid_key" ON "User"("githubid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
