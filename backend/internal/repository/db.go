package repository

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func InitDB() (*sql.DB, error) {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "postgres://postgres:postgres@localhost:5432/krishiv_creation?sslmode=disable"
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("database unreachable: %w", err)
	}

	return db, nil
}
