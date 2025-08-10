package tests

import (
	"book-library-backend/handlers"
	"net/url"
	"testing"
)

func TestProcessCanonical(t *testing.T) {
	cases := []struct {
		input    string
		expected string
	}{
		{"https://byfood.com/path/?query=abc", "https://byfood.com/path"},
		{"https://byfood.com/path/query=abc", "https://byfood.com/path"},
		{"https://byfood.com/path/", "https://byfood.com/path"},
		{"https://byfood.com/path#fragment", "https://byfood.com/path"},
		{"https://BYFOOD.com/food-EXPeriences?query=abc/", "https://BYFOOD.com/food-EXPeriences"},
	}
	for _, c := range cases {
		parsed, _ := url.Parse(c.input)
		result := handlers.ProcessCanonical(parsed)
		if result != c.expected {
			t.Errorf("Canonical failed: input=%s, got=%s, want=%s", c.input, result, c.expected)
		}
		t.Logf("✅ Canonical: input=%s, output=%s", c.input, result)
	}
}

func TestProcessRedirection(t *testing.T) {
	cases := []struct {
		input    string
		expected string
	}{
		{"https://byfood.com/path", "https://www.byfood.com/path"},
		{"https://BYFOOD.com/PATH", "https://www.byfood.com/path"},
		{"http://other.com/abc", "http://www.byfood.com/abc"},
	}
	for _, c := range cases {
		parsed, _ := url.Parse(c.input)
		result := handlers.ProcessRedirection(parsed)
		if result != c.expected {
			t.Errorf("Redirection failed: input=%s, got=%s, want=%s", c.input, result, c.expected)
		}
		t.Logf("🔀 Redirection: input=%s, output=%s", c.input, result)
	}
}

func TestProcessURLByOperation(t *testing.T) {
	cases := []struct {
		input     string
		operation string
		expected  string
	}{
		{"https://byfood.com/path/?query=abc", "canonical", "https://byfood.com/path"},
		{"https://byfood.com/path/?query=abc", "redirection", "https://www.byfood.com/path/?query=abc"},
		{"https://byfood.com/path/?query=abc", "all", "https://www.byfood.com/path"},
		{"https://BYFOOD.com/food-EXPeriences?query=abc/", "all", "https://www.byfood.com/food-experiences"},
		{"https://BYFOOD.com/food-EXPeriences?query=abc/", "canonical", "https://BYFOOD.com/food-EXPeriences"},
	}
	for _, c := range cases {
		result, err := handlers.ProcessURLByOperation(c.input, c.operation)
		if err != nil {
			t.Fatalf("Unexpected error: %v", err)
		}
		if result != c.expected {
			t.Errorf("Operation failed: input=%s, op=%s, got=%s, want=%s", c.input, c.operation, result, c.expected)
		}
		t.Logf("🔎 Operation: input=%s, op=%s, output=%s", c.input, c.operation, result)
	}
}
