<?php

/* theme-options/bootstrap_tabs.twig */
class __TwigTemplate_788a05e53df23570bd080700c3d94ab1071e6da70305581541040dbcedef230f extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("bootstrap_tabs.twig");

        $this->blocks = array(
            'extra_html' => array($this, 'block_extra_html'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "bootstrap_tabs.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_extra_html($context, array $blocks = array())
    {
        // line 3
        echo "\t";
        $context["__internal_acb0135a87d6a001747a0f88e3bbecab47dc739ff802794361ce1eb8798b98df"] = $this->env->loadTemplate("form-elements/input.twig");
        // line 4
        echo "\t<div class=\"ai1ec-text-right\">
\t\t<div class=\"ai1ec-btn-toolbar\">
\t\t\t";
        // line 6
        echo $context["__internal_acb0135a87d6a001747a0f88e3bbecab47dc739ff802794361ce1eb8798b98df"]->getbutton($this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "id"), $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "id"), $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "value"), "submit", $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "args"));
        echo "
\t\t\t";
        // line 7
        echo $context["__internal_acb0135a87d6a001747a0f88e3bbecab47dc739ff802794361ce1eb8798b98df"]->getbutton($this->getAttribute((isset($context["reset"]) ? $context["reset"] : null), "id"), $this->getAttribute((isset($context["reset"]) ? $context["reset"] : null), "id"), $this->getAttribute((isset($context["reset"]) ? $context["reset"] : null), "value"), "submit", $this->getAttribute((isset($context["reset"]) ? $context["reset"] : null), "args"));
        echo "
\t\t</div>
\t</div>
";
    }

    public function getTemplateName()
    {
        return "theme-options/bootstrap_tabs.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 3,  42 => 7,  38 => 6,  35 => 5,  25 => 2,  39 => 5,  58 => 12,  45 => 9,  37 => 7,  33 => 4,  51 => 10,  47 => 12,  43 => 9,  41 => 8,  36 => 5,  32 => 4,  27 => 3,  23 => 2,  20 => 1,  34 => 4,  31 => 3,  28 => 2,);
    }
}
