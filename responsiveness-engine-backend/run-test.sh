#!/bin/bash

# Auto-switch to Java 17 using SDKMAN if available
if [[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]]; then
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    if [[ -f .sdkmanrc ]]; then
        sdk env install 2>/dev/null || true
        sdk env || true
    fi
fi

# Run tests
./mvnw test