# Directories
SRC_STYLES := src/stylesheets
BUILD_DIR := build
BUILD_STYLES := $(BUILD_DIR)/stylesheets

.PHONY: all clean build

all: build

build: tsc sass

tsc:
	tsc

sass:
	sass $(SRC_STYLES):$(BUILD_STYLES)

clean:
	find $(BUILD_DIR) -type f -delete