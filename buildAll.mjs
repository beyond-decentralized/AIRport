import { spawn } from 'child_process';

const firstStageProjectDirectoriesInBuildOrder = [
    'libs/direction-indicator',
    'apis/aviation-communication',
    'apis/ground-control',
    'apis/check-in',
    'apis/apron',
    'ORMs/tarmaq/entity',
    'ORMs/tarmaq/query',
    'ORMs/tarmaq/dao',
    'apis/air-traffic-control',
    'libs/pressurization',
    'libs/vhf-radio',
    'libs/autopilot',
    'libs/flight-number'
]

const airbridgeDependencyProjectDirectories = [
    'validate'
]

const secondStageProjectDirectories = [
    'schemas/airport-code',
    'schemas/airspace',
    'schemas/travel-document-checkpoint',
    'schemas/holding-pattern',
    'schemas/layover',
    'apis/arrivals-n-departures',
    'apis/terminal-map',
    'engines/tower',
    'libs/fuel-hydrant-system',
    'libs/session-state',
    'libs/blueprint',
    'generators/takeoff',
    'generators/landing',
]

const airwayDependencyProjectDirectories = [
    'types',
    'client'
]

const thirdStageProjectDirectories = [
    'libs/ground-transport',
    'engines/terminal',
    'databases/sequence',
    'generators/runway',
    'databases/sqlite',
    'databases/sqljs',
    'platforms/api',
    'platforms/server',
    'platforms/web-tower',
    'platforms/web-terminal',
]

const reactUiProjects = [
    'components',
    'main'
]

try {
    await buildPeerFramework('AIRport', firstStageProjectDirectoriesInBuildOrder, true)
    await buildPeerFramework('AIRbridge', airbridgeDependencyProjectDirectories, true)
    await buildPeerFramework('AIRport', secondStageProjectDirectories, false)
    await buildPeerFramework('AIRway', airwayDependencyProjectDirectories, true)
    await buildPeerFramework('AIRport', thirdStageProjectDirectories, false)
    await buildUI('react', reactUiProjects)
} catch (e) {
    console.log(e)
}

async function buildPeerFramework(
    frameworkDirectoryName,
    projectDirectoriesInBuildOrder,
    runRushUpdate
) {
    process.chdir('../' + frameworkDirectoryName);
    if (runRushUpdate) {
        await wireInDependencies(frameworkDirectoryName)
    }
    await buildProjects(projectDirectoriesInBuildOrder, 'npm', ['run', 'build']);
}

async function buildUI(
    uiType,
    uiProjects
) {
    process.chdir('UI/' + uiType);
    await buildProjects(uiProjects, 'npm', ['run', 'build']);
    process.chdir('../..');
}

async function buildProjects(
    projectsDirectoriesInBuildOrder,
    command,
    parameters
) {
    for (const projectDirectory of projectsDirectoriesInBuildOrder) {
        const directoryDepth = projectDirectory.split('/');
        let navigateBackPath = '..'
        for (let i = 1; i < directoryDepth.length; i++) {
            navigateBackPath = '../' + navigateBackPath
        }
        process.chdir('./' + projectDirectory);

        const returnCode = await execute(projectDirectory, command, parameters);

        process.chdir(navigateBackPath);

        if (returnCode != 0) {
            throw new Error(`
        Suspending after ${projectDirectory}
        `)
        }
    };
}

async function wireInDependencies(
    frameworkName
) {
    await execute(frameworkName, 'rush', ['update'])
}

async function execute(
    operation,
    command,
    parameters
) {
    return new Promise((resolve, _reject) => {
        if (/^win/.test(process.platform)) {
            parameters = [
                '/s',
                '/c',
                command,
                ...parameters
            ]
            command = 'cmd'
        }

        process.stdout.write(`
        RUNNING '${command} ${parameters.join(' ')}' in ${process.cwd()}
    
        `)

        const runCommand = spawn(command, parameters);

        runCommand.stdout.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.stderr.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.on('error', (error) => {
            console.log(`${error.message}`);
        });

        runCommand.on("close", code => {
            console.log(`
        ${code ? 'ERROR' : 'DONE'}: ${operation}

    `);
            resolve(code)
        });
    })

}