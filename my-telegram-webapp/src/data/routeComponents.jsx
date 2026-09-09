import { lazy } from 'react';
export const articleComponents = {
"anxiety-impact": lazy(() => import('../components/articles/AnxietyImpactArticlePage.jsx')),
"self-awareness": lazy(() => import('../components/articles/SelfAwarenessArticlePage.jsx')),
"depression-vs-sadness": lazy(() => import('../components/articles/DepressionVsSadnessArticlePage.jsx')),
"positive-psychology": lazy(() => import('../components/articles/PositivePsychologyArticlePage.jsx')),
"better-decision-making": lazy(() => import('../components/articles/BetterDecisionMakingArticlePage.jsx')),
"stress-anxiety-management": lazy(() => import('../components/articles/StressAnxietyManagementArticlePage.jsx')),
"mindfulness-importance": lazy(() => import('../components/articles/MindfulnessImportanceArticlePage.jsx')),
"cognitive-biases": lazy(() => import('../components/articles/CognitiveBiasesArticlePage.jsx')),
"emotional-resilience": lazy(() => import('../components/articles/EmotionalResilienceArticlePage.jsx')),
"philosophy-of-happiness": lazy(() => import('../components/articles/PhilosophyOfHappinessArticlePage.jsx')),
"social-media-mental-health": lazy(() => import('../components/articles/SocialMediaMentalHealthArticlePage.jsx')),
"ethical-decision-making": lazy(() => import('../components/articles/EthicalDecisionMakingArticlePage.jsx')),
"meaning-of-life": lazy(() => import('../components/articles/MeaningOfLifeArticlePage.jsx')),
"healthy-communication-skills": lazy(() => import('../components/articles/HealthyCommunicationSkillsArticlePage.jsx')),
"overcoming-procrastination": lazy(() => import('../components/articles/OvercomingProcrastinationArticlePage.jsx'))
};
export const testComponents = {
"depression": lazy(() => import('../components/tests/TestContainer.jsx')),
"anxiety": lazy(() => import('../components/tests/TestContainerAnxiety.jsx')),
"big-five": lazy(() => import('../components/tests/TestPage.jsx')),
"o-c-d": lazy(() => import('../components/tests/OCDTestContainer.jsx')),
"bipolar": lazy(() => import('../components/tests/TestContainerBipolar.jsx')),
"eq-bar-on": lazy(() => import('../components/tests/SpecializedTests/EQBarOnTest.jsx')),
"addiction": lazy(() => import('../components/tests/TestContainerAddiction.jsx')),
"mental-health": lazy(() => import('../components/tests/MentalHealthTestPage.jsx')),
"relationship-readiness": lazy(() => import('../components/tests/RelationshipReadinessTest.jsx'))
};
