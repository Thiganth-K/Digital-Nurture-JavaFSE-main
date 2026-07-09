$ProofFile = "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\verification_proof.log"
Clear-Content -Path $ProofFile -ErrorAction SilentlyContinue

function Log-Message {
    param([string]$message)
    Write-Host $message
    Add-Content -Path $ProofFile -Value $message
}

Log-Message "=========================================================="
Log-Message "VERIFICATION PROOF: JAVA FSE DEEPSKILLING MODULES"
Log-Message "=========================================================="
Log-Message ""

# ----------------------------------------------------------------
# 1. Design Patterns
# ----------------------------------------------------------------
Log-Message "--- 1. DESIGN PATTERNS ---"
$dpPath = "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Engineering concepts\design-pattern-principles"

Log-Message ">> Ex 1: Singleton Pattern"
Set-Location "$dpPath\Exercise 1\SingletonPatternExample"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\Logger.java src\LoggerTest.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out LoggerTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 2: Factory Method Pattern"
Set-Location "$dpPath\Exercise 2\FactoryMethodPatternExample"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out DocumentFactoryTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 3: Builder Pattern"
Set-Location "$dpPath\Exercise 3\BuilderPatternExample"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out ComputerBuilderTest 2>&1 | Out-String | Add-Content $ProofFile

# ----------------------------------------------------------------
# 2. Algorithm & Data Structures
# ----------------------------------------------------------------
Log-Message "--- 2. ALGORITHMS & DATA STRUCTURES ---"
$algPath = "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Engineering concepts\algorithm-data-structure"

Log-Message ">> Ex 1: Inventory Management"
Set-Location "$algPath\Exercise1"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out InventoryTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 2: Search Algorithms"
Set-Location "$algPath\Exercise2"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out SearchTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 3: Sorting Algorithms"
Set-Location "$algPath\Exercise3"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out SortingTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 6: Library Search"
Set-Location "$algPath\Exercise6"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out LibraryTest 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Ex 7: Financial Forecasting"
Set-Location "$algPath\Exercise7"
if (Test-Path out) { Remove-Item -Recurse -Force out }
New-Item -ItemType Directory -Force -Path out | Out-Null
javac -d out src\*.java 2>&1 | Out-String | Add-Content $ProofFile
java -cp out ForecastingTest 2>&1 | Out-String | Add-Content $ProofFile

# ----------------------------------------------------------------
# 3. Spring Data JPA
# ----------------------------------------------------------------
Log-Message "`n--- 3. SPRING DATA JPA (orm-learn) ---"
Set-Location "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring Data JPA with Hibernate\orm-learn"
# Just clean compile and package to ensure it compiles correctly without running the server
Log-Message ">> Building Spring Data JPA Project..."
mvn clean compile 2>&1 | Out-String | Add-Content $ProofFile

# ----------------------------------------------------------------
# 4. Spring REST
# ----------------------------------------------------------------
Log-Message "`n--- 4. SPRING REST (country-rest-service) ---"
Set-Location "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring REST using Spring Boot\country-rest-service"
Log-Message ">> Compiling Spring REST Project..."
mvn clean compile 2>&1 | Out-String | Add-Content $ProofFile

# ----------------------------------------------------------------
# 5. Microservices
# ----------------------------------------------------------------
Log-Message "`n--- 5. MICROSERVICES ---"
Log-Message ">> Compiling Eureka Server..."
Set-Location "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Microservices\eureka-server"
mvn clean compile 2>&1 | Out-String | Add-Content $ProofFile

Log-Message ">> Compiling API Gateway..."
Set-Location "D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Microservices\api-gateway"
mvn clean compile 2>&1 | Out-String | Add-Content $ProofFile

Log-Message "`n=========================================================="
Log-Message "VERIFICATION COMPLETED"
Log-Message "=========================================================="
