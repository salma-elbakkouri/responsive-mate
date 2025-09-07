# Java Version Requirements

This Spring Boot project requires Java 17 (specified in pom.xml).

## Setup

### With SDKMAN (Recommended)

1. **Install SDKMAN:**
   ```bash
   curl -s "https://get.sdkman.io" | bash
   source "$HOME/.sdkman/bin/sdkman-init.sh"
   ```

2. **Install Java 17:**
   ```bash
   sdk install java 17.0.12-tem
   ```

3. **Auto-switch on directory entry:**
   The `.sdkmanrc` file automatically switches to Java 17 when you enter this directory:
   ```bash
   sdk env
   ```

### Without SDKMAN

Install Java 17 manually and set `JAVA_HOME` to Java 17 before running commands.

## Running the Project

Use the provided scripts that handle Java version switching:

- **Development server:** `./run-dev.sh`
- **Build project:** `./run-build.sh`
- **Run tests:** `./run-test.sh`

Or use Maven directly (ensure Java 17 is active):
```bash
./mvnw spring-boot:run
./mvnw clean package
./mvnw test
```

## Team Usage

- Scripts work with or without SDKMAN installed
- Your global Java version stays unchanged for other projects
- Everyone gets consistent Java 17 environment for this project

## Verification

Check current Java version:
```bash
java -version
```

Should show Java 17.x.x