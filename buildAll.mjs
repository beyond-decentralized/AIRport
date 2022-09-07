import { spawn } from 'child_process';

const firstStageProjectDirectoriesInBuildOrder = [
    'apis/aviation-communication',
    'libs/direction-indicator',
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
    'libs/ground-transport',
    'libs/blueprint',
    'generators/takeoff',
    'generators/landing',
]

const airwayDependencyProjectDirectories = [
    'types',
    'client'
]

const thirdStageProjectDirectories = [
    'engines/terminal',
    'databases/sequence',
    'generators/runway',
    'databases/sqlite',
    'databases/sqljs',
    'platforms/api',
    'platforms/app',
    'platforms/server',
    'platforms/web-tower',
    'platforms/web-terminal',
]

const reactUiProjects = [
    'components',
    'main'
]

try {
    // await buildPeerFramework('AIRport', firstStageProjectDirectoriesInBuildOrder, true)
    // await buildPeerFramework('AIRbridge', airbridgeDependencyProjectDirectories, true)
    // await buildPeerFramework('AIRport', secondStageProjectDirectories, false)
    // await buildPeerFramework('AIRway', airwayDependencyProjectDirectories, true)
    // await buildPeerFramework('AIRport', thirdStageProjectDirectories, false)
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
    await buildProjects(projectDirectoriesInBuildOrder, 'rollup', ['-c']);
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
        process.stdout.write(`
        RUNNING 'rollup -c' in ${projectDirectory}

        `)
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
        const rollup = spawn(command, parameters);

        rollup.stdout.on("data", data => {
            console.log(`${data}`)
        });

        rollup.stderr.on("data", data => {
            console.log(`${data}`)
        });

        rollup.on('error', (error) => {
            console.log(`${error.message}`);
        });

        rollup.on("close", code => {
            console.log(`
        ${code ? 'ERROR' : 'DONE'}: ${operation}

    `);
            resolve(code)
        });
    })

}