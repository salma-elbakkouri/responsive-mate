# Responsiveness Engine Backend

A Spring Boot application for web responsiveness testing with Playwright streaming capabilities.

## Tech Stack

- **Java 17** (Spring Boot 3.5.5)
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **Spring WebFlux** - Reactive web framework
- **Spring WebSocket** - Real-time communication
- **PostgreSQL** - Production database
- **H2** - Development in-memory database
- **Redis** - Caching (optional)
- **Maven** - Build tool

## Quick Start

### Prerequisites

1. **Java 17** (managed automatically with SDKMAN)
2. **SDKMAN** (optional but recommended)

### Setup & Run

1. **Install SDKMAN (if not installed):**
   ```bash
   curl -s "https://get.sdkman.io" | bash
   source "$HOME/.sdkman/bin/sdkman-init.sh"
   sdk install java 17.0.12-tem
   ```

2. **Run the application:**
   ```bash
   ./run-dev.sh
   ```

   Or alternatively:
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Access the application:**
   - API: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console

## Available Scripts

- `./run-dev.sh` - Start development server with hot reload
- `./run-build.sh` - Build the application (creates JAR)
- `./run-test.sh` - Run all tests

## Database Configuration

### Development (H2 In-Memory)
Currently configured for easy development with H2:

- **URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** (empty)
- **Console:** http://localhost:8080/h2-console

### Production (PostgreSQL)
For production, update `application.properties`:

```properties
# Replace H2 config with:
spring.datasource.url=jdbc:postgresql://localhost:5432/responsiveness_engine
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Remove H2 console
spring.h2.console.enabled=false
```

## Security Configuration

- **Development Login:** `admin` / `admin`
- **H2 Console:** Accessible without authentication
- **API Endpoints:** Require authentication (except H2)

## Java Version Management

This project uses Java 17. The setup automatically handles version switching:

- **`.sdkmanrc`** - Defines Java 17 requirement
- **Run scripts** - Auto-switch to Java 17 (if SDKMAN installed)
- **Global Java** - Remains unchanged for other projects

### Manual Java Switch
```bash
sdk env  # (if in project directory)
```

### Verify Java Version
```bash
java -version  # Should show Java 17.x.x
```

## Project Structure

```
src/
├── main/
│   ├── java/com/responsiveengine/backend/
│   │   ├── config/
│   │   │   └── SecurityConfig.java        # Security configuration
│   │   └── ResponsiveEngineBackendApplication.java
│   └── resources/
│       └── application.properties         # App configuration
└── test/                                 # Test files
```

## Configuration Files

- **`pom.xml`** - Maven dependencies and build configuration
- **`application.properties`** - Spring Boot application settings
- **`.sdkmanrc`** - Java version specification for SDKMAN
- **`JAVA_VERSION.md`** - Detailed Java setup instructions

## Development Notes

1. **Hot Reload:** Enabled via Spring DevTools
2. **Database:** Recreated on each restart (DDL: create-drop)
3. **SQL Logging:** Enabled for development
4. **CORS:** Configure as needed for frontend integration
5. **Redis:** Currently disabled, enable when needed

## Troubleshooting

### Java Version Issues
- Ensure Java 17 is active: `java -version`
- Install/switch: `sdk install java 17.0.12-tem && sdk use java 17.0.12-tem`

### Database Connection Failed
- Check if H2 console loads: http://localhost:8080/h2-console
- Verify JDBC URL: `jdbc:h2:mem:testdb`

### Port Already in Use
- Change port in `application.properties`: `server.port=8081`
- Or kill process: `sudo lsof -t -i:8080 | xargs kill -9`

## Next Steps

- [ ] Add API controllers
- [ ] Configure CORS for frontend
- [ ] Set up Playwright integration
- [ ] Add WebSocket endpoints
- [ ] Configure production database
- [ ] Add comprehensive tests
- [ ] Set up Redis caching

## Team Workflow

1. Always use provided run scripts (`./run-dev.sh`)
2. Java 17 switches automatically
3. H2 console available for database inspection
4. Default credentials: `admin`/`admin`
5. API available at http://localhost:8080