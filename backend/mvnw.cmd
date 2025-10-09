@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.

@REM ----------------------------------------------------------------------------
@REM Maven2 Wrapper Script for Windows
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars:
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the batch commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to wait for a keypress before exiting
@REM MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM MAVEN_SKIP_RC - set to 'on' to disable the loading of mavenrc_pre.bat and mavenrc_post.bat
@REM ----------------------------------------------------------------------------

@if "%MAVEN_BATCH_ECHO%" == "on"  echo %*

@REM set %HOME% to %HOMEDRIVE%%HOMEPATH%
if "%HOME%" == "" set HOME=%HOMEDRIVE%%HOMEPATH%

@set WRAPPER_LOCATION=%~dp0
@set MAVEN_PROJECTBASEDIR=%WRAPPER_LOCATION%
@set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

@REM Execute Wrapper
"%JAVA_HOME%\bin\java" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -Dmaven.home="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper" -jar "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar" %*

@if "%MAVEN_BATCH_PAUSE%" == "on" pause
